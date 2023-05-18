// Import external dependencies
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cron from "node-cron"

// Import local dependencies
import { apiAuth } from "./middlewares/auth.middleware"
import { limiter } from "./middlewares/rate-limit.middleware"
import { startupMessage } from "./utils/ascii.util"

// Import routes
import testRoutes from "./routes/_test.routes"
import userRoutes from "./routes/_user.routes"
import ccRoutes from "./routes/cc/cc.router"
import submarineRoutes from "./routes/pinata/submarine.routes"

// Import schedulers
import { updateHolders } from "./schedule/updateHolders.schedule"

// Configure app, add middlewares
dotenv.config()
const port = process.env.PORT || 1337
const app: express.Application = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors()) // Enable CORS for any route
app.use("/api", apiAuth) // Check for an API Key on every `/api/*` route
app.use("/", limiter) // Include a rate limiter for any route

// register routes
app.use("/", testRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cc", ccRoutes)
app.use("/api/pinata/submarine", submarineRoutes)

// 🚀 🚀 🚀
app.listen(port, () => {
	startupMessage(port)

	cron.schedule("7 * * * *", updateHolders) // Update every HH:07
})
