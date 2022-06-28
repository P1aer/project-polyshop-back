import express from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {registerValidator} from "../validations/auth.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router()

router.post("/login",async (req,res) => {
    try {
        const body = req.body;
        const user = await User.findOne({
            email: body.email,
        })
        if (!user) {
            return res.status(404).json({
                message:"пользователь не найден"
            })
        }
        const validPass = await bcrypt.compare(body.password,user._doc.password)

        if (!validPass) {
            return res.status(403).json({
                message:"Неверен логин или пароль"
            })
        }
        const token = jwt.sign({
                _id:user._id
            },
            "project",
            {
                expiresIn: "30d"
            })
        const {password, ...data} = user._doc
        res.json({
            token,
            ...data
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "не удалось авторизоваться"
        })
    }

})

router.get("/me",checkAuth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message:"Пользователь не найден",
                id: req.userId
            })
        }
        const {password, ...data} = user._doc
        res.json({
            ...data
        })
    }
    catch (err) {
        return res.status(403).json({
            message: "Вы не авторизованы"
        })
    }
})

router.post ("/register", registerValidator,async (req,res) => {
    try {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json(err.array())
        }

        const pass = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passHash = await bcrypt.hash(pass,salt)
        const doc = new User({
            email: req.body.email,
            password: passHash,
        })
        const user = await doc.save()
        const token = jwt.sign({
            _id:user._id
        },
            "project",
            {
            expiresIn: "30d"
        })
        const {password, ...data} = user._doc
        res.json({
            token,
            ...data
        })
    }
    catch (err) {
        console.log(err)
      res.status(500).json({
          message: "не удалось зарегистрироваться"
      })
    }


})

export default router