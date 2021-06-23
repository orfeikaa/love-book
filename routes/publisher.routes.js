module.exports = app => {
    const db = require("../models");
    const publishers = require("../controllers/publisher.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth.mid.js')
    const Order = db.orders;
    const config = require('config')


    router.get("/:id_book", publishers.findOneByBook);
    router.get("/", publishers.getAll);


    app.use("/api/publishers", router);
};
