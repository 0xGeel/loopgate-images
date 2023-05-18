import { CC_WALLET } from "../../config/cc/constants"
import { serverAuth } from "../../middlewares/auth.middleware"
import { getOwnershipData } from "../../services/cc/cc.service"
import { getFlatIgnoreList } from "../../services/cc/getFlatIgnoreList"
import { supabaseClient } from "../../utils/supabase.util"
import { Request, Response } from "express"

export const getHolders = async (_req: Request, res: Response) => {
	const { data, error } = await supabaseClient
		.from("calcium-crew-holders")
		.select("*")

	if (error || !data) {
		return res
			.status(500)
			.json({ message: "Unable to retrieve data from Supabase" })
	}

	return res.status(200).json(data)
}

/**
 * 1. 💿 Store last state of database
 * 2. Get & format owner data from TheGraph
 * 3. Delete old data
 * 4. Insert new data => onFail: rollback
 */
export const updateHolders = async (req: Request, res: Response) => {
	serverAuth(req, res)

	const { data: fallbackData, error: fallbackError } = await supabaseClient
		.from("calcium-crew-holders")
		.select("*")

	if (fallbackError || !fallbackData) {
		return res
			.status(500)
			.json({ message: "Unable to retrieve data from Supabase" })
	}

	const owners = await getOwnershipData(
		CC_WALLET.tokenAddress,
		getFlatIgnoreList(),
	)

	if (!owners) {
		return res
			.status(500)
			.json({ message: "Unable to retrieve data from TheGraph" })
	}

	const { error: deleteError } = await supabaseClient
		.from("calcium-crew-holders")
		.delete()
		.neq("id", 0)

	if (deleteError) {
		return res
			.status(500)
			.json({ message: "Unable to delete outdated holder data from Supabase" })
	}

	const { error: insertError } = await supabaseClient
		.from("calcium-crew-holders")
		.insert(
			owners.map((o) => ({
				amount: o.amount,
				cc_ids: o.cc_ids,
				eth_address: o.eth_address,
			})),
		)

	if (insertError) {
		await supabaseClient.from("calcium-crew-holders").insert(fallbackData)

		return res
			.status(500)
			.json({ message: "Unable to add updated holder data to Supabase" })
	}

	const end = new Date()

	return res.status(200).json({
		message: `Calcium Crew Holder stats have been updated on ${end.toISOString()}`,
	})
}
