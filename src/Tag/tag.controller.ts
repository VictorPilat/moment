import { Request, Response } from "express"
import { TagControllerContract } from "./tag.types"
import TagService from "./tag.service"

const TagController: TagControllerContract = {
  async getAll(req, res) {
    let skip: number | undefined
    let take: number | undefined

    if (req.query.skip) {
      skip = +req.query.skip
      if (isNaN(skip)) {
        res.status(400).json("skip must be a number")
        return
      }
    }

    if (req.query.take) {
      take = +req.query.take
      if (isNaN(take)) {
        res.status(400).json("take must be a number")
        return
      }
    }

    try {
      const tags = await TagService.getAll(skip, take)
      res.status(200).json(tags)
    } catch (error) {
      console.error("Error fetching tags:", error)
      res.status(500).json("Server internal error")
    }
  },

  async getById(req, res) {
    if (!req.params.id) {
      res.status(400).json("id is required")
      return
    }

    const id = +req.params.id
    if (isNaN(id)) {
      res.status(400).json("id must be a number")
      return
    }

    try {
      const tag = await TagService.getById(id)
      if (!tag) {
        res.status(404).json("Tag not found")
        return
      }

      res.status(200).json(tag)
    } catch (error) {
      res.status(500).json("Server internal error")
    }
  },
}

export default TagController
