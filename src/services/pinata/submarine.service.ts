import fs, { PathLike } from "fs"
import { Submarine } from "pinata-submarine"
import { GetSubmarinedContentOptions } from "pinata-submarine/build/types"

const submarine = new Submarine(
	process.env.PINATA_SUBMARINE_KEY,
	process.env.PINATA_GATEWAY_URL,
)

export const uploadFileOrFolder = async (filepath: PathLike) => {
	try {
		const apiRes = await submarine.uploadFileOrFolder(filepath)
		return apiRes
	} catch (error) {
		throw new Error("failed to upload file or folder to Pinata")
	} finally {
		fs.unlinkSync(filepath)
	}
}

export const getSubmarinedContent = async (
	options: GetSubmarinedContentOptions,
) => {
	try {
		const apiRes = await submarine.getSubmarinedContent(options)
		return apiRes
	} catch (error) {
		throw new Error("failed to get submarined content from Pinata")
	}
}
