import { uploadFileOrFolder } from "../../controllers/pinata/submarine.controller"
import { uploadEngine } from "../../middlewares/multer.middleware"
import { Router } from "express"

const router = Router()

router.post(
	"/upload",
	uploadEngine.single("uploadedImages"),
	uploadFileOrFolder,
)

export default router
