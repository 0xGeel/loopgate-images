const loopgateAscii = `
 _     _____  ___________ _____   ___ _____ _____ 
| |   |  _  ||  _  | ___ \\  __ \\ / _ \\_   _|  ___|
| |   | | | || | | | |_/ / |  \\// /_\\ \\| | | |__  
| |   | | | || | | |  __/| | __ |  _  || | |  __| 
| |___\\ \\_/ /\\ \\_/ / |   | |_\\ \\| | | || | | |___ 
\\_____/\\___/  \\___/\\_|    \\____/\\_| |_/\\_/ \\____/                                                   
`

const loopgateVersion = `👉 V${process.env.npm_package_version}`

export const startupMessage = (port: number) => {
	console.log(loopgateAscii)
	console.log(loopgateVersion)
	console.log("")
	console.log(`Loopgate is listening on port ✨${port}✨`)
}
