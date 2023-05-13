import {
	apiTestController,
	testController,
} from "../controllers/test.controller"
import { Router } from "express"

const router = Router()

// Route `/` tests
router.get("/", testController)
router.post("/", testController)
router.put("/", testController)
router.delete("/", testController)

// Route `/api` tests
router.get("/api", apiTestController)
router.post("/api", apiTestController)
router.put("/api", apiTestController)
router.delete("/api", apiTestController)

export default router
