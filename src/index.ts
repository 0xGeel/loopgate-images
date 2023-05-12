// Import dependencies
import dotenv from "dotenv"
import express from "express"

// Configure app
dotenv.config()
const port = process.env.PORT || 1337
const app: express.Application = express()
app.use(express.json())
app.use(express.urlencoded())

// Import & register routes
import submarineRoutes from "./routes/pinata/submarine.routes"
import userRoutes from "./routes/user.routes"

app.use("/users", userRoutes)
app.use("/pinata/submarine", submarineRoutes)

app.get("/", (req, res) => {
	res.send("Hello world!")
})

app.listen(port, () => {
	console.log(`Loopgate is listening on port ✨${port}✨`)
})
