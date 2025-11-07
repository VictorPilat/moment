import { TagServiceContract } from "./tag.types"
import { TagRepository } from "./tag.repository"

export const TagService: TagServiceContract = {
  getAll(skip, take) {
    return TagRepository.getAll(skip, take)
  },
  getById(id) {
    return TagRepository.getById(id)
  },
}

export default TagService
