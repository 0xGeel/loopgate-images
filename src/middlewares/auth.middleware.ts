import { NextFunction, Request, Response } from "express"

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
	const providedApiKey = req.headers["x-api-key"]

	if (!providedApiKey || providedApiKey !== process.env.LOOPGATE_API_KEY) {
		return res.status(401).json({ error: "Invalid API key" })
	}

	next()
}
