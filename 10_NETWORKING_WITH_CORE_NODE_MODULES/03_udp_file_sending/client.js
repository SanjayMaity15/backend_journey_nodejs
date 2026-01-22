import dgram from "node:dgram"
import fs from "node:fs/promises"

const socket = dgram.createSocket("udp4")

socket.on("message", (message, remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
    socket.close();
})

// const filContent = await fs.readFile("C:\\Users\\sanju\\Desktop\\number.txt")

// console.log(filContent);

const readFileHandle = await fs.open("C:\\Users\\sanju\\Desktop\\typescript.webm");


const readStream = readFileHandle.createReadStream({ highWaterMark: 1000 })


readStream.on("data", (chunk) => {

    socket.send(chunk, 5000, "172.24.212.131")
})


readStream.on('end', () => {
    socket.send("EOF", 5000, "172.24.212.131");

})

