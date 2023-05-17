import axios from "axios"

export const getTheGraphData = async (
	tokenAddress: string,
	ignoreList?: string,
) => {
	const query = `query {
            nonFungibleTokens(
            first: 1000,
            orderBy: id,
            skip: 0,
        where: { token: "${tokenAddress}"
            nftID_not_in: [ ${ignoreList} ]
            }
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
		return await axios.post(
			process.env.THEGRAPH_HOSTED_SERVICE_URL,
			JSON.stringify({ query }),
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
	} catch (error) {
		console.error(error)
		return { data: null }
	}
}
