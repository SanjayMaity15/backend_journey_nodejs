import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
	console.log(message.toString());
	console.log(remoteAddress);

	socket.send(
		"Message recived successfully",
		remoteAddress.port,
		remoteAddress.address,
	);
});

socket.bind({ port: 5000 }, () => {
	console.log(`Server is listening on port ${socket.address().port}`);
});
