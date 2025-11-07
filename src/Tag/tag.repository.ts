import { TagRepositoryContract } from "./tag.types"
import { client } from "../data/PrismaClient"

export const TagRepository: TagRepositoryContract = {
  async getAll(skip?: number, take?: number) {
    try {
      return await client.tag.findMany({
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
        include: {
          posts: {
            include: { post: true },
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async getById(id) {
    try {
      return await client.tag.findUnique({
        where: { id },
        include: {
          posts: {
            include: { post: true },
          },
        },
      })
    } catch (error) {
      return null
    }
  },
}
