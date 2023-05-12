import userRoutes from "./routes/userRoutes"
import express from "express"

const app: express.Application = express()
const port = process.env.PORT || 1337

app.use(express.json())

app.use("/users", userRoutes)

app.get("/", (req, res) => {
	res.send("Hello world!")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
