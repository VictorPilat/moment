import { Router } from 'express'
import { UserController } from './user.controller'

const router: Router = Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/me', UserController.me)

export default router