import { ignoreList } from "../../config/cc/ignorelist"

export const getFlatIgnoreList = () => {
	const joinedString = ignoreList.map((item) => `"${item}"`).join(",\n")
	return joinedString.replace("\n", "")
}
