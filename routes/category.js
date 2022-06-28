import express from "express"
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const router = express.Router()

router.get("/",async (req,res) => {
    try {
        const docs  = await Category.find()
        res.json(docs)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Категории не найдены"
        })
    }

})

router.get("/:id", async (req,res) => {
    try {
        const paramId = req.params.id;
        const products = await Product.find({
            category: paramId
        })
        res.json(products)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Товары не найдены"
        })
    }
})

export default router