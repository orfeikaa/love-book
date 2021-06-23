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
    await db.sequelize.query(`SELECT * FROM genres WHERE id_genre IN(SELECT genre_fk FROM book_genres WHERE book_fk = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
        res.send(results);
    })
};
exports.getAll = async (req, res) =>{
    Genre.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error."
            });
        });
};
