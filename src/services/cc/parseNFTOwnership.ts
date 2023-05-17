import { DEAD_WALLET } from "../../config/cc/constants"
import { Owner } from "../../models/cc/cc.model"

interface TheGraphResponse {
	nonFungibleTokens: {
		id: string
		slots: {
			id: string
			account: {
				id: string
				address: string
			}
		}[]
	}[]
}

export const parseNFTOwnership = (theGraphResponse: TheGraphResponse) => {
	const owners: Owner[] = []

	try {
		theGraphResponse.nonFungibleTokens.forEach((nft) => {
			const addressTocheck = nft.slots[0].account.address
			const owner = owners.find((x) => x.eth_address === addressTocheck)

			if (!owner) {
				owners.push({
					eth_address: nft.slots[0].account.address,
					amount: 1,
				})
				return
			}

			const updatedOwners = owners.map((x) =>
				x.eth_address === addressTocheck ? { ...x, amount: x.amount + 1 } : x,
			)
			owners.splice(0, owners.length, ...updatedOwners)
		})

		return owners
			.filter((x) => x.eth_address !== DEAD_WALLET.address)
			.sort((a, b) => b.amount - a.amount)
	} catch (err) {
		console.error(err)
	}
}
