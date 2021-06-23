module.exports = app => {
    const db = require("../models");
    const autors = require("../controllers/authors.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth.mid.js')
    const Order = db.orders;
    const config = require('config')


    router.get("/:id_book", autors.findOneByBook);
    router.get("/", autors.getAll);


    app.use("/api/authors", router);
};
