import { UserControllerContract } from "./user.types"
import { UserService } from './user.service'
import { TokenExpiredError, verify } from 'jsonwebtoken'
import { ENV } from '../config/env'

export const UserController: UserControllerContract = {
    login: async(req, res) => {
        try {
            let body = req.body
            
            if (!body) {
                res.status(400).json({ message: 'body is required' })
                return
            }
            const token = await UserService.login(body)
            res.status(200).json({token})
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                switch (error.message) {
                    case "NOT_FOUND":
                        res.status(401).json({message: 'wrong credentials'})
                        return
                    case "WRONG_CREDENTIALS":
                        res.status(401).json({message: 'wrong credentials'})
                        return
                }
            }   
            res.status(500).json({message: 'server error'})
        }
    },
    register: async(req, res) => {
        try {
            let body = req.body
            
            if (!body) {
                res.status(400).json({ message: 'body is required' })
                return
            }
            const token = await UserService.register(body)
            res.status(200).json({token})
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                switch (error.message) {
                    case "USER_EXISTS":
                        res.status(401).json({message: 'user already exists'})
                        return
                }
            }
            res.status(500).json({message: 'server error'})
        }
    },
    me: async(req, res) => {
        const Authorization = req.headers.authorization
        if (!Authorization) {
            res.status(401).json({message: "authorization is required"})
            return
        }
        const [type, token] = Authorization.split(" ")
        if (type != "bearer" || !token) {
            res.status(401).json({message: "wrong format authorization"})
            return
        }
        try {
            const payload = verify(token, ENV.JWT_ACCESS_SECRET_KEY)
            if (typeof payload == "string") {
                res.status(401).json({message: "Token wrong format"})
                return
            }
            const user = await UserService.me(payload.id)
            if (!user) {
                res.status(404).json({message: "User not found"})
                return
            }
            
            res.status(200).json(user)
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(401).json({message: "You need to reload your token. It expired"})
                return
            }
            res.status(401).json({message: "Invalid token"})
        }
    }
}