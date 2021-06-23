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

exports.findOneByBook = async (req, res) => {
    const id_book = req.params.id_book;


    await db.sequelize.query(`SELECT * FROM autors WHERE id_autor IN(SELECT author_fk FROM book_autors WHERE book_fk = ${id_book})`,
        {
            replacements: { id_book: id_book },
            type: QueryTypes.SELECT
        }).then(results => {
            res.send(results);
        })
};

exports.getAll = async (req, res) =>{
    Author.findAll()
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

