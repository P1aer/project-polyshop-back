import express from "express";
import fs from "fs";
import cors from "cors"
import https from "https"
import mongoose from "mongoose"
import auth from "./routes/auth.js"
import seller from "./routes/seller.js"
import category from "./routes/category.js"
import product from "./routes/product.js"
import hsts from "./utils/hsts.js";
import multer from "multer"

mongoose.connect(
    "mongodb+srv://admin:ember12345@cluster0.suo4q.mongodb.net/shop?retryWrites=true&w=majority"
).then(() => console.log("start DB MONGA"))

const key = fs.readFileSync("./.cert/localhost-key.pem", "utf-8");
const cert = fs.readFileSync("./.cert/localhost.pem", "utf-8");

const app = express()
const port = 8433
const credentials = {key: key, cert: cert};
const storage = multer.diskStorage({
    destination: (_,__,cb) =>{
        cb(null,"uploads")
    },
    filename:(_,file,cb) =>{
        cb(null,file.originalname)
    },
})

const upload = multer({ storage })

app.use(hsts)
app.use(cors())
app.use(express.json());
app.use("/uploads",express.static("uploads"))
app.use("/auth",auth)
app.use("/product",product)
app.use("/category", category)
app.use("/seller", seller)

app.post("/upload", upload.single("image"),(req,res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port,() => {
    console.log("Server Started "+ port)
})

