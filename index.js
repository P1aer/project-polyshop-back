import express from "express";
import fs from "fs";
import https from "https"
import http from "http"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose.connect(
    "mongodb+srv://admin:ember12345@cluster0.suo4q.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log("start DB MONGA"))

const key = fs.readFileSync("./.cert/localhost-key.pem", "utf-8");
const cert = fs.readFileSync("./.cert/localhost.pem", "utf-8");
const app = express()
const port = 8433
const credentials = {key: key, cert: cert};

app.use(function(req, res, next) {//max-age=31536000
     res.setHeader('Strict-Transport-Security', 'max-age=300; includeSubDomains; preload');
     next()
})
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/auth/login",(req,res) => {
    const body = req.body;
    const token = jwt.sign({
        email: body.email,
        password: body.password,
        },"project")
    res.json({
        success: true,
        token
    })
})
/*const httpServer = http.createServer(app)*/
const httpsServer = https.createServer(credentials, app);
/*httpServer.listen(8080)*/
httpsServer.listen(port,() => {
    console.log("Server Started "+ port)
})

