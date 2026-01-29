import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))

app.use(cookieParser())

app.get("/", (req, res) => {
    console.log(req.cookies)
    res.cookie("name", "sanjay", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.json("Server is running...")
})

app.listen(8000, () => {
    console.log("Server running at port 8000")
})