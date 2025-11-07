// import { Request, Response } from "express";
// import TagService from "./tag.service";
// import { TagControllerContract } from "./tag.types";

// const TagController: TagControllerContract = {
//   getAll: async (req, res) => {
//     const skip = Number(req.query.skip)
//     const take = Number(req.query.take)

//     if (skip && isNaN(+skip)) {
//       res.status(400).json("skip is not a number")
//       return
//     }

//     if (take && isNaN(+take)) {
//       res.status(400).json("take is not a number")
//       return
//     }

//     try {
//       const tags = await TagService.getAll(skip, take)
//       res.status(200).json(tags)
//     } catch (error) {
//       res.status(500).json("Error fetching tags")
//     }
//   },

//   getById: async (req, res) => {
//     if (!req.params.id) {
//       res.status(400).json("id is required")
//       return
//     }

//     const id = +req.params.id
//     if (isNaN(id)) {
//       res.status(400).json("id must be an integer")
//       return
//     }

//     try {
//       const tag = await TagService.getById(id)
//       if (!tag) {
//         res.status(404).json("Tag not found")
//         return
//       }

//       res.json(tag)
//     } catch (error) {
//       res.status(500).json("Error fetching tag")
//     }
//   },
// }

// export default TagController


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
