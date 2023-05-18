import { getHolders, updateHolders } from "../../controllers/cc/cc.controller"
import { Router } from "express"

const router = Router()

router.get("/holders", getHolders)
router.get("/updateHolders", updateHolders)

export default router
