import moment from "moment"
import { Request, Response } from "express"
import PostService from "./post.service"
import { PostControllerContract } from "./post.types"

function getDate() {
  return moment().format("Y/MM/DD H:mm:ss")
}

const PostController: PostControllerContract = {
  async getAll(req, res) {
    let skip: number | undefined
    let take: number | undefined
    
    if (req.query.skip) {
      skip = +req.query.skip
      if (isNaN(skip)) {
        res.status(400).json("Skip must be a number")
        return
      }
    }
    
    if (req.query.take) {
      take = +req.query.take
      if (isNaN(take)) {
        res.status(400).json("Take must be a number")
        return
      }
    }
    
    try {
      const posts = await PostService.getAll(skip, take)
      res.status(200).json(posts)
    } catch (error) {
      console.error("Error fetching posts:", error)
      res.status(500).json("Server internal error")
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
