import { getOwnershipData } from "../../services/cc/cc.service"
import { supabaseClient } from "../../utils/supabase.util"
import { Request, Response } from "express"

export const getHolders = async (_req: Request, res: Response) => {
	const { data, error } = await supabaseClient
		.from("calcium-crew-holders")
		.select("*")

	if (error || !data) {
		return res.status(500).json({ message: "Internal server error" })
	}

	return res.status(200).json(data)
}

export const updateHolders = async (req: Request, res: Response) => {
	// 1. Query TheGraph for CC holders
	const owners = await getOwnershipData()

	if (!owners) {
		return res
			.status(500)
			.json({ message: "Unable to retrieve data from TheGraph" })
	}

	// 2. Delete previous DB
	// const { data: deleteData, error: deleteError } = await supabaseClient
	// 	.from("calcium-crew-holders")
	// 	.delete()
	// 	.eq("*", "*")

	// if (deleteError || !deleteData) {
	// 	return res.status(500).json({ message: "Internal server error" })
	// }

	// 3. Update DB with TheGraph Data
	return res.status(200).json({ owners })
}
