import { PostRepository } from './post.repository'
import {  PostServiceContract } from './post.types'





export const PostService: PostServiceContract = {
    
    getAll(skip, take) {
        return PostRepository.getAll(skip, take);
    },
    getById(id) {
        return PostRepository.getById(id);
    },
    create(data) {
        return PostRepository.create(data);
    },
    delete(id) {
        return PostRepository.delete(id);
    },
     update(id, data) {
        return PostRepository.update(id, data)
    },
}
export default PostService