import moment from "moment"
import { Request, Response } from "express"
import PostService from "./post.service"
import { UpdatePostData } from "./post.types"
import { PostControllerContract } from "./post.types"


function getDate() {
    return moment().format("Y/MM/DD H:mm:ss")
}


const PostController: PostControllerContract = {
    getAll: (req, res) => {

        const skip = Number(req.query.skip)
        const take = Number(req.query.take)

        if (skip) {
            if (isNaN(+skip)) {
                res.status(400).json("is not a number")
                return
            }
        }

        if (take) {
            if (isNaN(+take)) {
                res.status(400).json("is not a number")
                return
            }
            const slicedPosts = PostService.getAll(skip, take)
            res.status(200).json(slicedPosts)
            return
        }

        const posts = PostService.getAll(skip, take)
        res.status(200).json(posts)
        return
        
    },
    getById: (req, res) => {
        if (!req.params.id){
            res.status(400).json("required");
            return
        }
        const id = +req.params.id
        console.log(id)

        if (isNaN(id)) {
            res.status(400).json("id must be an integer")
            return
        }

        const post = PostService.getById(id)

        if (!post) {
            res.status(404).json("post not found")
            return
        }

        res.json(post)
    },
    create: async (req, res) => {
        console.log(req.body)
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

        const post = await PostService.create(body)

        if (!post) {
            res.status(500).json("Post creation error")
            return
        }

        res.status(201).json(post)
    },
    update: async (req, res) => {
        const id = req.params.id
        
        if (!id) {
            res.status(400).json("id is required")
            return
        }
        
        const body = req.body 

        if (body.name && typeof body.name !== 'string') {
            res.status(400).json(" name is not a string")
            return
        }

        if (body.description && typeof body.description !== 'string') {
            res.status(400).json(" description is not a string")
            return
        }

        if (body.img && typeof body.img !== 'string') {
            res.status(400).json(" image URL is not a string")
            return
        }

        const post = await PostService.update(+id, body)
        
        if (!post) {
            res.status(404).json("Post not found")
            return
        }
        
        res.status(200).json(post)
    },

    getTimestamp: (req, res) => {
        res.json(getDate())
    },
 

}



export default PostController















