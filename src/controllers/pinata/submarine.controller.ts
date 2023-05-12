import * as Sub from "../../services/pinata/submarine.service"
import { Request, Response } from "express"

export const uploadFileOrFolder = async (req: Request, res: Response) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.")
	}

	const filePath = req.file.path

	try {
		const apiRes = await Sub.uploadFileOrFolder(filePath)
		return res.status(200).json(apiRes)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ status: 400, message: error })
	}
}
