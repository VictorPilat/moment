import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'



const postsPath = path.join(__dirname, "posts.json")
const posts: {
    id: number,
    name: string,
    description: string,
    img: string
}[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"))

const PostService = {
    getAll (skip: number, take: number) {
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
    getById(id: number) {
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
    }
}
export default PostService