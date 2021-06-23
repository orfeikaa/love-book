module.exports = app => {
    const db = require("../models");
    const genre = require("../controllers/genre.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth.mid.js')
    const Order = db.orders;
    const config = require('config')


    router.get("/:id_book", genre.findOneByBook);
    router.get("/", genre.getAll);



    app.use("/api/genres", router);
};
