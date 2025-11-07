// import { Request, Response } from "express";
// import { Prisma } from "../generated/prisma";

// export type Tag = Prisma.TagGetPayload<{}>;

// export interface TagServiceContract {
//   getAll(skip?: number, take?: number): Promise<Tag[]>;
//   getById(id: number): Promise<Tag | null>;
// }

// export interface TagControllerContract {
//   getAll: (req: Request<object, Tag[] | string, object, { skip?: string; take?: string }>,res: Response<Tag[] | string>) => Promise<void> | void;

//   getById: (req: Request<{ id: string }, Tag | string, object>,res: Response<Tag | string>) => Promise<void> | void;
// }


import { Request, Response } from "express"
import { Prisma } from "../generated/prisma"

export type Tag = Prisma.TagGetPayload<{}>
export type TagWithPosts = Prisma.TagGetPayload<{
  include: { posts: { include: { post: true } } }
}>

export interface TagRepositoryContract {
  getAll(skip?: number, take?: number): Promise<TagWithPosts[]>
  getById(id: number): Promise<TagWithPosts | null>
}

export interface TagServiceContract {
  getAll(skip?: number, take?: number): Promise<TagWithPosts[]>
  getById(id: number): Promise<TagWithPosts | null>
}

export interface TagControllerContract {
  getAll: (req: Request<object, TagWithPosts[] | string, object, { skip?: string; take?: string }>, res: Response<TagWithPosts[] | string>) => Promise<void>
  getById: (req: Request<{ id: string }, TagWithPosts | string, object>, res: Response<TagWithPosts | string>) => Promise<void>
}
