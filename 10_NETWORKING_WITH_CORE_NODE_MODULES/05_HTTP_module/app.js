import http from "node:http";

const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	res.setHeader("Content-Length", "34");

	req.on("data", (chunk) => {
		console.log(chunk.toString());
	});

	res.write("Hello from server nice to meet you");
});

server.listen(5000, () => {
	console.log("Server is running at port 5000");
});
