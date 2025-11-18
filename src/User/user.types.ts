import { Request, Response } from "express"
import { Prisma } from "../generated/prisma"

export type User = Prisma.UserGetPayload<{}>
export type UserWithoutPassword = Prisma.UserGetPayload<{omit: {password: true}}>
export type ErrorResponse = {message: string}
export type UserAuthResponse = {token: string}

export type UserCreate = Prisma.UserUncheckedCreateInput

export interface LoginCredentials {
    email: string,
    password: string
}

export interface UserControllerContract {
    register: (req: Request<object, object, UserCreate>, res: Response<ErrorResponse | UserAuthResponse>) => Promise<void>
    login: (req: Request<object, object, LoginCredentials>, res: Response<ErrorResponse | UserAuthResponse>) => Promise<void>
    me: (req: Request, res: Response) => Promise<void>
}

export interface UserRepositoryContract {
    create: (credentials: UserCreate) => Promise<User>,
    findByEmail: (email: string) => Promise<User | null>,
    findByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>
}

export interface UserServiceContract {
    register: (credentials: UserCreate) => Promise<string>,
    login: (credentials: LoginCredentials) => Promise<string>,
    me: (id: number) => Promise<UserWithoutPassword | null>
}