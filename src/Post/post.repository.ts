import {  PostRepositoryContract } from "./post.types";
import { client } from "../data/PrismaClient";


export const PostRepository: PostRepositoryContract = {
    async getAll(skip: number, take: number){
        try {
            return await client.post.findMany({
                skip,
                take,
                include: { tags: true },
            })
            
        } catch (error) {
            console.log(error)
            throw error
        }
    },
        
    async getById(id){
        try {
            return await client.post.findUnique({
                where: {id},
                include: { tags: true },
            })
        } catch (error) {
            return null
        }
    },
    

    async create(data){
        try{
            return await client.post.create({data})
        }
        catch (error) {
            throw error
        } 
    },
    
    
    async delete(id){
        try{
            return await client.post.delete({
                where:{id}
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
     async update(id, data) {
        return await client.post.update({
            where: {
                id
            }, 
            data
        })
    }
    
}
