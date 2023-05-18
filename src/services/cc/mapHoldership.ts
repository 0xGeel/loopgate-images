import { DEAD_WALLET } from "../../config/cc/constants"
import { Holder, TheGraphResponse } from "../../models/cc/cc.model"

export const mapHoldership = (theGraphResponse: TheGraphResponse) => {
	const holders: Holder[] = []

	try {
		theGraphResponse.nonFungibleTokens.forEach((nft) => {
			const addressTocheck = nft.slots[0].account.address
			const holder = holders.find((x) => x.eth_address === addressTocheck)

			if (!holder) {
				holders.push({
					eth_address: nft.slots[0].account.address,
					amount: 1,
					cc_ids: [nft.nftID],
				})
				return
			}

			const updatedHolders = holders.map((x) =>
				x.eth_address === addressTocheck
					? { ...x, amount: x.amount + 1, cc_ids: x.cc_ids.concat(nft.nftID) }
					: x,
			)
			holders.splice(0, holders.length, ...updatedHolders)
		})

		return holders
			.filter((x) => x.eth_address !== DEAD_WALLET.address)
			.sort((a, b) => b.amount - a.amount)
	} catch (err) {
		console.error(err)
		return
	}
}
