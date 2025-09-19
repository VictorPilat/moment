const moment = require('moment');
const express = require('express')
const app = express()

function getDate(){
    return moment().format("Y/MM/DD H:mm:ss");
}

const PORT = 8000
const HOST = 'localhost'

app.get("/timestamp", (req, res) =>{
    res.json("" + getDate());
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})