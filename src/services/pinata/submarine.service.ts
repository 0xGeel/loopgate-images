import { Submarine } from "pinata-submarine"
const submarine = new Submarine(
	process.env.PINATA_SUBMARINE_KEY,
	process.env.PINATA_GATEWAY_URL,
)
import fs, { PathLike } from "fs"

export const uploadFileOrFolder = async (filepath: PathLike) => {
	try {
		const res = await submarine.uploadFileOrFolder(filepath)
		return res
	} catch (error) {
		throw new Error("failed to upload file or folder")
	} finally {
		fs.unlinkSync(filepath)
	}
}
