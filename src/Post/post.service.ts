import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { Post, UpdatePostData, PostServiceContract, PostWithTags } from './post.types'
import { PrismaClient } from "../generated/prisma"

const client = new PrismaClient()
const postsPath = path.join(__dirname, "posts.json")

const posts: Post[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"))


const PostService: PostServiceContract = {
    async getAll(skip?: number, take?: number) {
        try {
            const allPosts = await client.post.findMany({
                include: { tags: true },
            })

            if (skip == null && take == null) {
                return allPosts
            }

            if (take != null && (skip == null || skip === 0)) {
                return allPosts.slice(0, take)
            }

            if (skip != null && take == null) {
                return allPosts.slice(skip)
            }

            if (skip != null && take != null) {
                return allPosts.slice(skip, skip + take)
            }

            return allPosts
        } catch (error) {
            console.error(error)
            return []
        }
    },

    async getById(id) {
        try {
        const post = await client.post.findUnique({
            where: { id },
            include: { tags: true },
        })
        return post
        } catch (error) {
            return null
        }
    },

    async create(data) {
        try {
            const newPost = await client.post.create({ data })
            return newPost
        } catch (error) {
            return null
        }
    },

    async update(id, data) {
        try {
        const updatedPost = await client.post.update({
            where: { id },
            data,
        })
        return updatedPost
        } catch (error) {
            return null
        }
    },
    async delete(id: number) {
        try {
            const deletedPost = await client.post.delete({
            where: { id }
            })
            return deletedPost
        } catch (error) {
            console.error(error)
            return null
        }
    },

    
}
export default PostService