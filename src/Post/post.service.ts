import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { Post, UpdatePostData, PostServiceContract } from './post.types'



const postsPath = path.join(__dirname, "posts.json")

const posts: Post[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"))


const PostService: PostServiceContract = {
    getAll (skip, take) {
        if (!skip && !take) {
            return posts
        }

        if (take) {
            return posts.slice(0, +take)
        }

        if (skip) {
            return posts.slice(+skip)
        }

        return posts.slice(+skip, +skip + +take)
    },
    getById(id) {
        const post = posts.find((pr)=>{
            const isMatch = pr.id === id
            return isMatch   
        })
        return post
    },

    async create(data: { name: string, description: string, img: string }) {
        try {
            const newPost = { ...data, id: posts.length + 1 }
            posts.push(newPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return newPost
        } catch (error) {
            return null
        }
    },
    async update(id, data) {
        const postI = posts.findIndex(post => post.id === id)
        if (postI === -1) {
            return null
        }

        try {
            const updatedPost = { ...posts[postI], ...data } as Post
            posts.splice(postI, 1, updatedPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return updatedPost
        } catch (error) {
            return null
        }
}
    
}
export default PostService