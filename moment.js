// const moment = require('moment');
// const express = require('express')
// const path = require("path")
// const fs = require("fs")
// const fsPromises = require("fs/promises")

// const app = express()
// app.use(express.json())

// const PORT = 8000
// const HOST = 'localhost'


// const postsPath = path.join(__dirname,"posts.json")
// const posts = JSON.parse(fs.readFileSync(postsPath,"utf-8"))


// function getDate(){
//     return moment().format("Y/MM/DD H:mm:ss");
// }


// // app.get("/posts",(req,res) =>[
// //     res.status(200).json(posts)
// // ])

// app.get("/posts", (req,res)=>{
//     const take = req.query.take
//     const skip = req.query.skip


//     if (take && skip) {
//         if (isNaN(+take) || isNaN(+skip)) {
//             res.status(400).json("is not a number")
//             return
//         }
//         const skipTake = posts.slice(+skip, 0 + +take)
//         res.status(200).json(skipTake)
//         return
//     }
//     if (take) {
//         if (isNaN(+take)){
//             res.status(400).json("is not a number")
//             return
//         }
//         const slicedPosts = posts.slice(0, +take)
//         res.status(200).json(slicedPosts)
//         return
//     }
//     if (skip) {
//         if (isNaN(+skip)){
//             res.status(400).json("is not a number")
//             return
//         }
//         const slicedPosts = posts.slice(+skip)
//         res.status(200).json(slicedPosts)
//         return
//     }

//     res.status(200).json(posts)
// })
// app.get("/posts/:id",(req, res)=>{
//     const id = +req.params.id
//     if (isNaN(id)){
//         res.status(400).json("id must be an integer");
//         return
//     }
//     const post = posts.find((pr)=>{
//         const isMatch = pr.id === id
//         return isMatch
//     })

//     if (!post){
//         res.status(404).json("post not found")
//         return;
//     }

//     res.json(post)
// })


// app.get("/timestamp", (req, res) =>{
//     res.json("" + getDate());
// })
// app.post("/posts", async (req, res) => {
//     const body = req.body
//     const CreationPost = { ...body, id: posts.length + 1 }

//     if (!body) {
//         res.status(422).json("problem with the body ")
//         return
//     }

//     if (!CreationPost.name) {
//         res.status(422).json("problem with the name")
//         return
//     }

//     if (!CreationPost.description) {
//         res.status(422).json("problem with the description")
//         return
//     }

//     if (!CreationPost.img) {
//         res.status(422).json("problem with the image")
//         return
//     }

//     try{
        
//         posts.push(CreationPost)
//         await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2))
//         res.status(201).json(CreationPost)
//     } catch (error){
//         res.status(500).json("Creation error")
//     }
// })

// app.listen(PORT, HOST, () => {
//     console.log(`Server started on http://${HOST}:${PORT}`)
// })