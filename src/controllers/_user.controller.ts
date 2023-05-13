import { Request, Response } from "express"

export const getUser = (req: Request, res: Response) => {
	res.send("Logic to get the user details")
}

export const createUser = (req: Request, res: Response) => {
	res.send("Logic to create a new user")
}

export const updateUser = (req: Request, res: Response) => {
	res.send("Logic to update user details")
}

export const deleteUser = (req: Request, res: Response) => {
	res.send("Logic to delete a user")
}
