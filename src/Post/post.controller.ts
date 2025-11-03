import moment from "moment"
import { Request, Response } from "express"
import PostService from "./post.service"
import { PostControllerContract } from "./post.types"

function getDate() {
  return moment().format("Y/MM/DD H:mm:ss")
}

const PostController: PostControllerContract = {
  getAll: async (req, res) => {
    const skip = Number(req.query.skip)
    const take = Number(req.query.take)

    if (skip && isNaN(+skip)) {
      res.status(400).json("skip is not a number")
      return
    }

    if (take && isNaN(+take)) {
      res.status(400).json("take is not a number")
      return
    }

    try {
      const posts = await PostService.getAll(skip, take) 
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json("Error fetching posts")
    }
  },

  getById: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json("id is required")
      return
    }

    const id = +req.params.id
    if (isNaN(id)) {
      res.status(400).json("id must be an integer")
      return
    }

    try {
      const post = await PostService.getById(id) 
      if (!post) {
        res.status(404).json("Post not found")
        return
      }

      res.json(post)
    } catch (error) {
      res.status(500).json("Error fetching post")
    }
  },

  create: async (req, res) => {
    const body = req.body

    if (!body) {
      res.status(422).json("Body is required.")
      return
    }

    if (!body.name) {
      res.status(422).json("name is required.")
      return
    }

    if (!body.description) {
      res.status(422).json("description is required.")
      return
    }

    if (!body.img) {
      res.status(422).json("image is required.")
      return
    }

    try {
      const post = await PostService.create(body)
      if (!post) {
        res.status(500).json("Post creation error")
        return
      }

      res.status(201).json(post)
    } catch (error) {
      res.status(500).json("Error creating post")
    }
  },

  update: async (req, res) => {
    const id = req.params.id

    if (!id) {
      res.status(400).json("id is required")
      return
    }

    const body = req.body

    if (body.name && typeof body.name !== "string") {
      res.status(400).json("name is not a string")
      return
    }

    if (body.description && typeof body.description !== "string") {
      res.status(400).json("description is not a string")
      return
    }

    if (body.img && typeof body.img !== "string") {
      res.status(400).json("image URL is not a string")
      return
    }

    try {
      const post = await PostService.update(+id, body)
      if (!post) {
        res.status(404).json("Post not found")
        return
      }

      res.status(200).json(post)
    } catch (error) {
      res.status(500).json("The post has not been updated")
    }
  },
  delete: async (req, res) => {
    const id = +req.params.id
    if (isNaN(id)) {
        res.status(400).json("id must be a number")
        return
    }

    try {
        const deletedPost = await PostService.delete(id)
        if (!deletedPost) {
            res.status(404).json("Post not found")
            return
        }

        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(500).json("The post was not deleted")
    }
    },


  getTimestamp: (req, res) => {
    res.json(getDate())
  },
}

export default PostController
