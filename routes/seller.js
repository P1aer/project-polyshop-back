import express from "express"
import Seller from "../models/Seller.js";
import Product from "../models/Product.js";


const router = express.Router()

router.get("/",async (req,res) => {
    try {
        const docs  = await Seller.find()
        res.json(docs)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Продавцы не найдены"
        })
    }

})

router.get("/:id", async (req,res) => {
    try {
        const paramId = req.params.id;
        const products = await Product.find({
            seller: paramId
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