import dgram from "node:dgram"

const socket = dgram.createSocket("udp4")

socket.on("message", (message, remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
    socket.close();
})

socket.send("Hi, kaise ho app log", 5000, "172.24.212.131")
