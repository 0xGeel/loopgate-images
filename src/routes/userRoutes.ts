import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController"
import { Router } from "express"

const router = Router()

router.get("/", getUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router
