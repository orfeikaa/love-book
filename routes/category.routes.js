module.exports = app => {
    const db = require("../models");
    const categs = require("../controllers/category.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth.mid.js')
    const Order = db.orders;
    const config = require('config')


    router.get("/:id_book", categs.findOneByBook);
    router.get("/", categs.getAll);
    router.get("/getOne/:id_cat", categs.getBooksByOne);


    app.use("/api/category", router);
};
