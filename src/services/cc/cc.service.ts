import { getTheGraphData } from "./getTheGraphData"
import { mapHoldership } from "./mapHoldership"

export const getOwnershipData = async (
	tokenAddress: string,
	ignoreList?: string,
) => {
	const { data: theGraphData } = await getTheGraphData(tokenAddress, ignoreList)

	if (!theGraphData) {
		console.error("Unable to retrieve data from TheGraph")
		return
	}

	const owners = mapHoldership(theGraphData)

	if (!owners) {
		console.error("Unable to parse TheGraph data for ownership")
		return
	}

	return owners
}
