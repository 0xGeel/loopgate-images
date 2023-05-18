import axios from "axios"

export const updateHolders = async () => {
	console.log("⏳ Updating holders...")
	try {
		const { data } = await axios.get(
			`${process.env.LOOPGATE_API_URL}/api/cc/updateHolders`,
			{
				headers: {
					"x-api-key": process.env.LOOPGATE_API_KEY,
					"x-server-key": process.env.LOOPGATE_SERVER_KEY,
				},
			},
		)
		console.log(`✅ ${data.message}`)
	} catch (err) {
		console.log(err)
	}
}
