const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")

const postsPath = path.join(__dirname, "posts.json")
let posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"))


const PostService = {
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
    getById(id){
        const post = posts.find((pr)=>{
            const isMatch = pr.id === id
            return isMatch   
        })
        return post
    },

    async create(data) {
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
module.exports = PostService