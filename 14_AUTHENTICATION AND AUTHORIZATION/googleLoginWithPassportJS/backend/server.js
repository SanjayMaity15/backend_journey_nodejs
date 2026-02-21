import express from "express"
import cors from "cors"
import "./config/passport.js"
import passport from "passport"
import authRoutes from "./routes/auth.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5500"
}))

app.use(passport.initialize())
app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(8000, () => {
    console.log("Server is running at 8000")
})