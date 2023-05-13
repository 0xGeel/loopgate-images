declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: number
			PINATA_SUBMARINE_KEY: string
			PINATA_GATEWAY_URL: string
			LOOPGATE_API_KEY: string
		}
	}
}

export {}
