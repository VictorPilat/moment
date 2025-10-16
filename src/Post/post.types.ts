export interface Post {
  id: number
  name: string
  description: string
  img: string
}

export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Omit<Post, "id">>