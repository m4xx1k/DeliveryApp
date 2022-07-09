const express = require("express")
const path = require("path")
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3002, () => {
    console.log('JSON Server is running')
})

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname,'build')))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})

app.listen(PORT)