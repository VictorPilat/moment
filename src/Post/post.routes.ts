import express from 'express'
import PostController from './post.controller'
import { authMiddleware } from '../User/auth.middleware'


const Postrouter = express.Router()
Postrouter.get("/posts/", PostController.getAll)
Postrouter.get("/posts/:id", PostController.getById)
Postrouter.get("/timestamp", PostController.getTimestamp)
Postrouter.post("/posts", authMiddleware, PostController.create)
Postrouter.patch("/posts/:id", authMiddleware, PostController.update)
Postrouter.delete("/posts/:id", authMiddleware, PostController.delete)

export default Postrouter
