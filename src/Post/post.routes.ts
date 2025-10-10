import express from 'express'
import PostController from './post.controller'



const Postrouter = express.Router()
Postrouter.get("/posts/", PostController.getAll)
Postrouter.get("/posts/:id", PostController.getById)
Postrouter.get("/timestamp", PostController.getTimestamp)
Postrouter.post("/posts", PostController.create)

export default Postrouter
