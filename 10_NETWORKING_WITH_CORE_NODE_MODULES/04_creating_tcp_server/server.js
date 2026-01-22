import net from "node:net"

const server = net.createServer()

server.listen(5000)

server.on("listening", () => {
    console.log("server is running at port no 5000");
})

server.on("connection", (socket) => {
    console.log("Client connected :", socket.remoteAddress);
    console.log("Client port :", socket.remotePort);
    console.log("Client family :", socket.remoteFamily);


    socket.on("data", (chunk) => {
        console.log(chunk.toString());
        socket.write("Message Received");
        
    })
    
    // socket.on("error", () => {
    //     console.log("Scoket close")
    // })
})

