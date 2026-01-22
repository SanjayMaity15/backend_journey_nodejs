import dgram from "node:dgram";
import fs from "fs";

const socket = dgram.createSocket("udp4");
const writeStream = fs.createWriteStream("./nnn.webm");

socket.on("message", (message, remoteAddress) => {
	if (message.toString() === "EOF") {
		socket.send(
			"File recived successfully",
			remoteAddress.port,
            remoteAddress.address,
            // writeStream.end()
		);
	} else {
		writeStream.write(message);
	}
});

socket.bind({ port: 5000 }, () => {
	console.log(`Server is listening on port ${socket.address().port}`);
});
