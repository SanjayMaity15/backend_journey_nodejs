import express from "express"
import connectDB from "./db/db.js"
import userRouter from "./router/userRoutes.js"

const app = express()

app.use(express.json())

app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(8000, () => {
    connectDB()
    console.log("Server is running at port 8000")
})