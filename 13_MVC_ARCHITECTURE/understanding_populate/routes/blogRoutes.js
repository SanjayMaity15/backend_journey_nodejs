import express from "express"
import { createPost, createUser, getPost } from "../controller/controller.js"

const router = express.Router()

router.post("/user", createUser)
router.get("/post", getPost)
router.post("/post", createPost)
// router.post("/comment")

export default router