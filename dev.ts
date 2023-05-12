import dotenv from "dotenv"

dotenv.config()

const env = process.env

type ENV = typeof env

declare global {
	namespace NodeJS {
		// rome-ignore lint/suspicious/noEmptyInterface:
		interface ProcessEnv extends ENV {}
	}
}

export {}
