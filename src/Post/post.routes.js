const express = require("express")
const PostController = require("./post.controller")

const Postrouter = express.Router()
Postrouter.get("/posts/", PostController.getAll)
Postrouter.get("/posts/:id", PostController.getById)
Postrouter.get("/timestamp", PostController.getTimestamp)
Postrouter.post("/posts", PostController.create)

module.exports = Postrouter
