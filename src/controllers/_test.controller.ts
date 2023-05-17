import { Request, Response } from "express"

export const testController = (req: Request, res: Response) => {
	const message = `Hello world! This is LoopGate NodeJS @ ${process.env.npm_package_version}`

	res.send({ message })
}

export const apiTestController = (req: Request, res: Response) => {
	const message = `Welcome, ✨${req.ip}✨. Good to have you.`

	res.send({ message })
}
