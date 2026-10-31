import express from "express"
import housesRouter from "./routes/houses.routes.js"

const app = express()
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
  res.send("Welcome to the Hogwarts Course Management System")
})

app.use("/houses", housesRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
