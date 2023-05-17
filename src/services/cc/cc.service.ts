import { CC_WALLET } from "../../config/cc/constants"
import { getFlatIgnoreList } from "./getFlatIgnoreList"
import { getTheGraphData } from "./getTheGraphData"
import { parseNFTOwnership } from "./parseNFTOwnership"

export const getOwnershipData = async () => {
	const ignoreList = getFlatIgnoreList()

	const { data: theGraphData } = await getTheGraphData(
		CC_WALLET.tokenAddress,
		ignoreList,
	)

	if (!theGraphData) {
		console.error("Unable to retrieve data from TheGraph")
		return
	}

	const owners = parseNFTOwnership(theGraphData.data)

	if (!owners) {
		console.error("Unable to parse TheGraph data for ownership")
		return
	}

	return owners
}
