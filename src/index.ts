// Import external dependencies
import dotenv from "dotenv"
import express from "express"

// Import local dependencies
import { apiAuth } from "./middlewares/auth.middleware"
import { startupMessage } from "./utils/ascii.util"

// Configure app, add middlewares
dotenv.config()
const port = process.env.PORT || 1337
const app: express.Application = express()
app.use(express.json())
app.use(express.urlencoded())
app.use("/api", apiAuth)

// Import & register routes
import userRoutes from "./routes/_user.routes"
import submarineRoutes from "./routes/pinata/submarine.routes"
import testRoutes from "./routes/test.routes"

app.use("/", testRoutes)
app.use("/api/users", userRoutes)
app.use("/api/pinata/submarine", submarineRoutes)

// 🚀 🚀 🚀
app.listen(port, () => {
	startupMessage(port)
})
