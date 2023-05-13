import {
	getSubmarinedContent,
	uploadFileOrFolder,
} from "../../controllers/pinata/submarine.controller"
import { uploadEngine } from "../../middlewares/multer.middleware"
import { Router } from "express"

const router = Router()

router.post("/upload", uploadEngine.single("uploadedFiles"), uploadFileOrFolder)

// @DEV NOTE: Look into multi uploads. We currently use `.single("uploadedFiles").
// We could use .array("uploadedFiles", 50), but the controller needs to be changed to handle that.
// Important: POST header: `Content-Type: multipart/form-data`.

router.get("/content", getSubmarinedContent)

export default router
