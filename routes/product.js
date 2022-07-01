import express from "express"
const router = express.Router()
import Product from "../models/Product.js"
import {productCreateValidator} from "../validations/product.js";
import { validationResult} from "express-validator";
import checkAuth from "../utils/checkAuth.js";


router.post("/create",productCreateValidator, async (req, res) => {
   try {
       const err = validationResult(req)
       if (!err.isEmpty()) {
           return res.status(400).json(err.array())
       }
       const doc = new Product({
           name: req.body.name,
           price: req.body.price,
           category: req.body.category,
           description: req.body.description,
           seller: req.body.seller,
           info: req.body.info,
           picture: req.body.picture,
       })
       const product = await doc.save()
       res.json(product)
   }  
   catch (err) {
       console.log(err)
       res.status(500).json({
           message: "Продукт не создан"
       })
   }
})

router.get('/',async (req,res) => {
    try {
        const products = await Product.find().populate(["seller","category"]).exec()
        res.json(products)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Товары не найдены"
        })
    }
})

router.post("/search",async (req,res) => {
    try {
        const data = await Product.find({
            name: { $regex: req.body.data }
        },null, {limit:10})
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить товары"
        })
    }
})

router.post('/getCart',async (req,res) => {
    try {
        const product = await Product.find({
            _id : {
                $in: req.body
            }
        })
        if (!product) {
            return res.status(404).json({
                message: "Товар не найден"
            })
        }
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Товар не удалось получить"
        })
    }
})

router.get('/:id',async (req,res) => {
    try {
        const paramId = req.params.id;
        const product = await Product.findById(paramId).populate(["seller","category"]).exec()
        if (!product) {
            return res.status(404).json({
                message: "Товар не найден"
            })
        }
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Товар не удалось получить"
        })
    }
})

router.delete('/:id',checkAuth,async (req,res) => {
    try {
        const paramId = req.params.id;
        await Product.findOneAndDelete({
            _id: paramId
        },(err,doc) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    message: "не удалось удалить Товар"
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Товар не найден"
                })
            }
            res.json({
                success: true
            })
        })
    }
    catch (err) {

    }
})

router.patch('/:id',checkAuth,productCreateValidator,async (req,res) => {
    try {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json(err.array())
        }
        const paramId = req.params.id;
        await Product.updateOne({
            _id:paramId
        }, {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            seller: req.sellerId,
            info: req.body.info,
            picture: req.body.picture,
        })
        res.json({
            success: true
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "не удалось обновить Товар"
        })
    }
})



export default router