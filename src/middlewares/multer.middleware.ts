import multer from "multer"

const storageEngine = multer.diskStorage({
	destination: "_uploads/",
	filename: (_req, file, cb) => {
		cb(null, `${file.originalname}`)
	},
})

export const uploadEngine = multer({
	storage: storageEngine,
	limits: {
		fileSize: 500 * 1024 * 1024, // 500 MB
	},
	fileFilter: (_req, file, cb) => {
		if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg"
		) {
			cb(null, true)
		} else {
			cb(null, false)
			const err = new Error("Only .png, .jpg and .jpeg format allowed!")
			err.name = "FileExtensionError"
			return cb(err)
		}
	},
})
