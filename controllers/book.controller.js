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
const {validationResult} = require('express-validator');

exports.create = async ( req, res) => {

    try{

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // console.log(req.body.email, req.body.password);
            return res.status(400).json({
                //errors: errors.array(),
                message: 'Некорректный данные при регистрации',

            })
        }

        const existing = await Book.findOne({where: {title : req.body.title}});
        if(!existing){
            const book = {
                title: req.body.title,
                demo: req.body.demo,
                text: req.body.text,
                pub_fk: req.body.pub,
                cat_fk: req.body.cat,
                price: req.body.price,
                images: req.body.images,
                owners: req.body.owners

            };

            Book.create(book)
                .then(data => {
                    const new_id = data.id_book;
                    const book_author = {
                        book_fk: new_id,
                        author_fk: req.body.author
                    }
                    const book_genre = {
                        book_fk: new_id,
                        genre_fk: req.body.gen
                    }
                    Book_authors.create(book_author)
                    Book_genre.create(book_genre)

                    return res.status(201).json({ message: 'Добавлена книга' })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating."
                    });
                });
        }else{
            return res.status(400).json({
                message: 'Такая книга уже существует'
            })

        }

    }catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

    }





};


exports.findAll = async (req, res) => {

    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
};


exports.myBooks = async (req, res) =>{
    const id_user = req.params.id_user;
    Book.findAll({ where: { owners: id_user } })
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


exports.getOrder =  async (req, res) => {
    // try{
    //     const book_id = await Order.find({where: {
    //         user_fk: req.user.id
    //         }})
    //    // const books = await Book.find({})//??
    //     res.json(book_id)
    // }catch (e){
    //     res.status(500).json({message: "Что то пошло не так"})
    // }
};



exports.findOne = async (req, res) => {
    const id_book = req.params.id_book;
    console.log(id_book)

    await Book.findByPk(id_book).then(response => {
       res.send(response);
    }).catch(err => {
            res.status(500).send({
                message: "Error retrieving with id=" + {id_book}
            });
        });
};


exports.update = (req, res) => {
    const id_book = req.params.id_book;

    Book.update(req.body, {
        where: { id_book: id_book}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update with id=${id_book}. Maybe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating  with id=" + id_book
            });
        });
};


exports.delete = (req, res) => {
    const id_book = req.params.id_book;

    Book_authors.destroy({where: {book_fk: id_book}})
    Book_genre.destroy({where: {book_fk: id_book}})
    Book.destroy({
        where: { id_book: id_book }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete  with id=${id_book}. Maybe elem was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete with id=" + id_book
            });
        });
};



exports.findByCat = (req, res) => {
    const id_cat = req.params.cat_fk;
     Book.findAll({ where: { cat_fk: id_cat } })
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

exports.findByGen = async (req, res) => {
  //   const id_g = req.params.id;
  //   const itog=
  //       {};
  //  // const books_g = Book_genre.findAll({where: {genre_fk: id_g }}).then(
  //  //     book => Book.findAll({where: {id_book: book.book_fk}}).then(
  //   //        data=> res.send(data)
  //    //   )
  //  // );
  //   console.log("Data "+ id_g);
  // //  console.log(JSON.stringify(books_g, null, 2));
  // //  books_g.every(book => Book.findAll({where: {id_book: book.book_fk}})
  //  //     .then(data=> itog.push(data))
  // //  );
  //    await db.sequelize.query('SELECT book_fk FROM book_genres WHERE genre_fk = :genre',
  //     {
  //       replacements: { genre: id_g },
  //       type: QueryTypes.SELECT
  //     }
  //   ).then(results => {
  //       console.log(results);
  //
  //      // results.every(elem => itog.append(elem.book_fk.value))
  //       // console.log(itog);
  //       Book.findAll({where: {$in: results}}).then(data=>
  //       res.send(data))
  //   });
  //   //
  //   // const quer = await db.sequelize.query(
  //   //     'SELECT book_fk FROM book_genres WHERE genre_fk = 2',
  //   //     {
  //   //         bind: { status: 'active' },
  //   //         type: QueryTypes.SELECT
  //   //     }
  //   // );

    // Book.findAll({ where: { cat_fk: id_cat } })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error."
    //         });
    //     });
}
