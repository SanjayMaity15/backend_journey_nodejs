import express from 'express'
import { addUser, deleteUser, findUserById, findUsers, updateUser } from '../controller/userController.js'

const router = express.Router()

router.post("/add", addUser)
router.put("/update/:id", updateUser)
router.get("/", findUsers)

router.get("/:id", findUserById)
router.delete("/del/:id", deleteUser)

export default router