const db = require("../models");
const Book = db.books;
const Genre = db.genres;
const Book_genre = db.books_genres;
const Order = db.orders;
const Author = db.authors;
const Category = db.categorys;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const {QueryTypes} = require('sequelize')
const auth = require('../middleware/auth.mid.js')
const config = require('config')
const Book_authors = db.book_authors;
const Publisher = db.bublishers;

exports.findOneByBook = async (req, res) => {
    const id_book = req.params.id_book;
    await db.sequelize.query(`SELECT * FROM categories WHERE id_cat IN(SELECT cat_fk FROM books WHERE id_book = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
}

exports.getBooksByOne = async (req, res) => {
    const id_cat = req.params.id_cat;
    await db.sequelize.query(`SELECT * FROM books WHERE cat_fk = ${id_cat}`,
        {
            replacements: { id_cat: id_cat },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
}

exports.getAll = async (req, res) =>{
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error."
            });
        });
}
