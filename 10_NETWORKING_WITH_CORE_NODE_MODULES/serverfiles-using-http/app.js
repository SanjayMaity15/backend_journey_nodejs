import http from "node:http";
import fs from "fs";
const server = http.createServer((req, res) => {
	if (req.url === "/css") {
		const readStream = fs.createReadStream("./style.css", {
			highWaterMark: 16 * 1024,
		});

		readStream.on("data", (chunk) => {
			res.write(chunk);
		});
    }
	if (req.url === "/js") {
		const readStream = fs.createReadStream("./script.js", {
			highWaterMark: 16 * 1024,
		});

		readStream.on("data", (chunk) => {
			res.write(chunk);
		});
	}
	if (req.url === "/html") {
		const readStream = fs.createReadStream("./index.html", {
			highWaterMark: 16 * 1024,
		});

		readStream.on("data", (chunk) => {
			res.write(chunk);
		});
	}

	res.end("Server is start...");
});

server.listen(3000, () => {
	console.log("Server is listening at port no 3000");
});
