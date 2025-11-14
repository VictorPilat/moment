import { UserRepositoryContract } from "./user.types"
import { client } from "../data/PrismaClient"

export const UserRepository: UserRepositoryContract = {
    async create(credentials) {
        return await client.user.create({data: credentials})
    },
    async findByEmail(email) {
        const user = await client.user.findUnique({
            where: {email: email}
        })
        return user
    },
    async findByIdWithoutPassword(id) {
        const user = await client.user.findUnique({
            where: {id},
            omit: {password: true}
        })
        return user
    }
}