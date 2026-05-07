import express from "express"
import bcrypt from "bcrypt"
const app = express()


app.use((req, res, next) => {
	// Allow all origins
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Allow specific headers
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);

	// Allow HTTP methods
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS",
	);

	next();
});

app.get("/", (req, res) => {
    res.send("Hello Bro")
})

app.get("/login",async (req, res) => {
    await bcrypt.hash("543246", 14)
    res.status(200).json({
        message: "Login successful"
    })
})

app.listen(8000, () => {
    console.log("Server is running");
})




