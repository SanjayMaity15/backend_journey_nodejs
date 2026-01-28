import express from "express";

const app = express();
app.disable("x-powered-by");

const PORT = 3000;

// app.get(
// 	"/",
// 	(req, res, next) => {
// 		res.setHeader("Content-Type", "text/html");
// 		res.write("Hello World 1");
// 		next();
// 	},
//     (req, res) => {
//         throw new Error("Error")
// 		res.end("Hello World 2");

// 	},
// 	(err, req, res, next) => {

// 		res.end("Error  ");
// 	},
// );


app.use(express.json())

app.use(express.static("public"))

// app.use("/test", (req, res, next) => {
// 	console.log("Middleware");
// 	next();
// });

app.get("/", (req, res) => {
	res.send("Get request");
});

app.get("/pdf", (req, res) => {
	res.sendFile(`${import.meta.dirname}/public/chooseCopy.png`)
});

// app.post("/post", (req, res) => {
//     res.send("Post request")
// })

app.listen(PORT, () => {
	console.log("SERVER STARTED AT PORT", PORT);
});
