import { Request, Response } from "express"

export interface Post {
  id: number
  name: string
  description: string
  img: string
}

export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostServiceContract {
  getAll: (skip: number, take: number) => Post[]
  getById: (id: number) => Post | undefined
  create: (data: CreatePostData) => Promise<Post | null>
  update: (id: number, data: UpdatePostData) => Promise<Post | null>
}

export interface PostControllerContract {
  getAll: (req: Request<object, Post[] | string, object, { skip?: string; take?: string }>, res: Response<Post[] | string>) => void,
  getById: (req: Request<{ id: string }, Post | string, object>, res: Response<Post | string>) => void,
  create: (req: Request<object, Post | string, CreatePostData, object>, res: Response<Post | string>) => Promise<void>,
  update: (req: Request<{ id: number }, Post | string, UpdatePostData, object>, res: Response<Post | string>) => Promise<void>,
  getTimestamp: (req: Request, res: Response<string>) => void
}