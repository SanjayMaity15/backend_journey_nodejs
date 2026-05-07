import express from "express";
import cors from "cors"
import { fetchUser } from "./services/googleLoginService.js";
const app = express();

app.use(cors({
    origin: "http://localhost:5500"
}))

app.use(express.json())

app.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code
    const user = await fetchUser(code)
    console.log(user);
    res.redirect("http://localhost:5500/callback.html")
    return res.json(user)
})          

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(8000, () => {
	console.log("Server started");
});
