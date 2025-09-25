const moment = require('moment');
const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()


const PORT = 8000
const HOST = 'localhost'


const postsPath = path.join(__dirname,"posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath,"utf-8"))


function getDate(){
    return moment().format("Y/MM/DD H:mm:ss");
}


app.get("/posts",(req,res) =>[
    res.status(200).json(posts)
])
app.get("/timestamp", (req, res) =>{
    res.json("" + getDate());
})


app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})