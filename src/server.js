const express = require('express')
const PostRouter = require('./Post/Post.routes')




const app = express()
app.use(express.json())
app.use(PostRouter)


const PORT = 8000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})