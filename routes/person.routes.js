module.exports = app => {
    const db = require("../models");
    const persons = require("../controllers/person.controller.js");
    const Book = db.books;
    const {body} = require('express-validator');
    const {check} = require('express-validator');
    const auth = require('../middleware/auth.mid.js')
    var router = require("express").Router();

    //router.post("/", persons.create);
    router.get("/owner/:id_user", auth, async (req, res) => {
        const id_user = req.user.userId;
        Book.findAll({where:
                {owners : id_user}
        }).then(data => {
            res.send(data);
        });

    });

   // router.get("/", persons.findAll);


    //  router.get("/published", tutorials.findAllPublished);


 //   router.get("/:id_user", persons.findOne);


  //  router.put("/:id_user", persons.update);


  //  router.delete("/:id_user", persons.delete);


  //  router.delete("/", persons.deleteAll);

    router.post("/register",
        [
            check('email', 'Некорректный email').isEmail(),
            check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
        ],
        persons.reg);

    router.post("/login",
        [
            check('email', 'Некорректный email').isEmail(),
            check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
        ],persons.login);

  //  router.post("/logout", persons.logout);

  //  router.get("/refresh", persons.refresh);

    app.use("/api/persons", router);
};
