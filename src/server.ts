import express from 'express'
import Postrouter from './Post/post.routes'




const app: express.Express = express()
app.use(express.json())
app.use(Postrouter)


const PORT: number = 8000
const HOST: string = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})