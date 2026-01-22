import net from "node:net"
import fs from "node:fs"

process.stdin.on("data", (input) => {
    socket.write(input)
})



const socket = net.createConnection({ port: 5000, host: "172.24.212.131" })


const readStream = fs.createReadStream("C:\\Users\\sanju\\Desktop\\typescript.webm");

readStream.on("data", (chunk) => {
    socket.write(chunk)
})

socket.on("data", (chunk) => {
    console.log(chunk.toString())
})

socket.on("error", () => {
    console.log("Client close");
})