const db = require("../models");
const Person = db.persons;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');



exports.reg = async (req, res) => {

        try {
           const errors = validationResult(req)

           if (!errors.isEmpty()) {
              // console.log(req.body.email, req.body.password);
               return res.status(400).json({
                   errors: errors.array(),
                   message: 'Некорректный данные при регистрации',

               })
           }

            const {email, password} = req.body
            console.log(req.body.email, req.body.password);
            const candidate = await Person.findOne({ where: {email: email }})

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new Person({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    };

 exports.login = async (req, res, next) => {
     try {
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
             return res.status(400).json({
                 errors: errors.array(),
                 message: 'Некорректный данные при авторизации'
             })
         }

         const {email, password} = req.body

         const candidate = await Person.findOne({ where: {email: email }})

         if (!candidate) {
             return res.status(400).json({ message: 'Такой пользователь не найден' })
         }

         const isMatch = await bcrypt.compare(password, candidate.password)

         if(!isMatch) {
             return res.status(400).json({ message: 'Неверный пароль, попробуйте снова'})
         }

         const token = jwt.sign(
             { userId: candidate.id_user },
              'lox',
             { expiresIn: '1h' }
         )

         res.json({ token, userId: candidate.id_user })

     } catch (e) {
         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
     }
 };


 exports.Owner = async (req, res) =>{

 };
