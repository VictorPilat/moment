import express from 'express'
import Postrouter from './Post/post.routes'
import TagRouter from './Tag/tag.routes'
import { UserRouter } from './User/user.routes'

const app: express.Express = express()
app.use(express.json())

app.use(Postrouter)
app.use(TagRouter)
app.use('/user/', UserRouter)

const PORT: number = 8000
const HOST: string = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`✅ Server is running on http://${HOST}:${PORT}`)
})
