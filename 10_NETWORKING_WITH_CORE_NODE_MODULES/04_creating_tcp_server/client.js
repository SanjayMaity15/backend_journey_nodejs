import net from "node:net"

const socket = net.createConnection({ port: 5000, host: "172.24.212.131" })

setTimeout(() => {
    socket.write("Hii")
    socket.end()
}, 3000)


socket.on("error", () => {
    console.log("Client close");
})