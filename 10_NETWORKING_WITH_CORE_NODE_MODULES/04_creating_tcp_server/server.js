import net from "node:net";
import fs from "node:fs";
import { pipeline } from "node:stream";

const server = net.createServer();
server.listen(5000);

server.on("listening", () => {
	console.log("server is running at port no 5000");
});

server.on("connection", (socket) => {
	console.log("Client connected:", socket.remoteAddress);

	const writeStream = fs.createWriteStream("./abcd.webm", { flags: "a" });

	pipeline(socket, writeStream, (err) => {
		if (err) {
			console.error("Pipeline failed:", err);
		} else {
			console.log("Stream finished");
		}
	});

	socket.on("close", () => {
		console.log("Client disconnected");
	});
});
