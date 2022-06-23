import express from "express";
import fs from "fs";
import https from "https"
import mongoose from "mongoose"
import auth from "./routes/auth.js"
import product from "./routes/product.js"
import hsts from "./utils/hsts.js";

mongoose.connect(
    "mongodb+srv://admin:ember12345@cluster0.suo4q.mongodb.net/shop?retryWrites=true&w=majority"
).then(() => console.log("start DB MONGA"))

const key = fs.readFileSync("./.cert/localhost-key.pem", "utf-8");
const cert = fs.readFileSync("./.cert/localhost.pem", "utf-8");

const app = express()
const port = 8433
const credentials = {key: key, cert: cert};

app.use(hsts)
app.use(express.json());
app.use("/auth",auth)
app.use("/product",product)

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port,() => {
    console.log("Server Started "+ port)
})

