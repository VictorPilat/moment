import { Request, Response } from "express"
import { Prisma } from "../generated/prisma"

// export interface Post {
//   id: number
//   name: string
//   description: string
//   img: string
// }
export type Post = Prisma.PostGetPayload<{}>

export type PostWithTags = Prisma.PostGetPayload<{
 include: { tags: true }

}>

export type CreatePost = Prisma.PostCreateInput

export type CreatePostChecked = Prisma.PostUncheckedCreateInput

export type UpdatePost = Prisma.PostUpdateInput

export type UpdatePostChecked = Prisma.PostUncheckedUpdateInput

export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Omit<Post, "id">>


export interface PostServiceContract {
  getAll: (skip?: number, take?: number) => Promise<Post[] | PostWithTags[]>
  getById: (id: number) => Promise<PostWithTags | null>
  create: (data: CreatePostChecked) => Promise<Post | null>
  update: (id: number, data: UpdatePostChecked) => Promise<Post | null>
  delete: (id: number) => Promise<Post | null>
}
export interface PostRepositoryContract {
  getAll(skip?: number, take?: number): Promise<PostWithTags[]>
  getById(id: number): Promise<PostWithTags | null>
  create(data: CreatePostChecked): Promise<Post | null>
  update(id: number, data: UpdatePostChecked): Promise<Post | null>
  delete(id: number): Promise<Post | null>
}
export interface PostControllerContract {
  getAll: (req: Request<object, Post[] | string, object, { skip?: string; take?: string }>,res: Response<Post[] | string>) => Promise<void> | void
  getById: (req: Request<{ id: string }, PostWithTags | string, object>,res: Response<PostWithTags | string>) => Promise<void> | void
  create: (req: Request<object, Post | string, CreatePost, object>,res: Response<Post | string>) => Promise<void>
  update: (req: Request<{ id: number }, Post | string, UpdatePost, object>,res: Response<Post | string>) => Promise<void>
  delete: (req: Request<{ id: string }>, res: Response<Post | string>) => Promise<void>
  getTimestamp: (req: Request, res: Response<string>) => void
}