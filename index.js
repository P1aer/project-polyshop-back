import express from "express";
import fs from "fs";
import https from "https"
import http from "http"

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

/*const httpServer = http.createServer(app)*/
const httpsServer = https.createServer(credentials, app);
/*httpServer.listen(8080)*/
httpsServer.listen(port,() => {
    console.log("Server Started "+ port)
})

