import { NextFunction, Request, Response } from "express"

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
	const providedApiKey = req.headers["x-api-key"]

	if (!providedApiKey || providedApiKey !== process.env.LOOPGATE_API_KEY) {
		return res
			.status(401)
			.json({ error: "Unauthorized: Invalid LoopGate API key" })
	}

	next()
}

export const serverAuth = (
	req: Request,
	res: Response,
	next?: NextFunction,
) => {
	const providedServerKey = req.headers["x-server-key"]

	if (
		!providedServerKey ||
		providedServerKey !== process.env.LOOPGATE_SERVER_KEY
	) {
		return res
			.status(401)
			.json({ error: "Unauthorized: Invalid LoopGate Server key" })
	}
}
