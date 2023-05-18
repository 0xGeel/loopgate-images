import { TheGraphResponse } from "../../models/cc/cc.model"
import axios from "axios"

export const getTheGraphData = async (
	tokenAddress: string,
	ignoreList?: string,
): Promise<{ data: TheGraphResponse } | { data: undefined }> => {
	const handleIgnoreList = ignoreList ? `nftID_not_in: [ ${ignoreList} ]` : ""
	const query = `
  {
    nonFungibleTokens(
      first: 1000,
      orderBy: id,
      skip: 0,
      where: { token: "${tokenAddress}" ${handleIgnoreList}}
    ) {
      nftID
      slots(first: 1000, skip: 0, orderBy: id) {
        account {
          id
          address
        }
      }
    }
  }`

	try {
		const { data } = await axios.post(
			process.env.THEGRAPH_HOSTED_SERVICE_URL,
			JSON.stringify({
				query,
			}),
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		)

		if (data.length === 0) {
			console.error("Unable to find holders from TheGraph")
			return { data: undefined }
		}

		return data
	} catch (error) {
		console.error(error)
		return { data: undefined }
	}
}
