import { uploadFileOrFolder } from "../../controllers/pinata/submarine.controller"
import { Router } from "express"
import multer from "multer"

const storageEngine = multer.diskStorage({
	destination: "_uploads/",
	filename: (_req, file, cb) => {
		cb(null, `${file.originalname}`)
	},
})

// Note: Content-Type: multipart/form-data
const upload = multer({
	storage: storageEngine,
	limits: {
		fileSize: 500 * 1024 * 1024, // 500 MB
	},
})

const router = Router()

router.post("/upload", upload.single("singleFile"), uploadFileOrFolder)

export default router
