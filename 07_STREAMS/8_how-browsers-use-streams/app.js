import http from "http";

import fs from "node:fs/promises"
import { pipeline } from "node:stream/promises";



const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("Content-Type", "image/webp");


const readFileHandle = await fs.open("./river.webp");
  const readStream = readFileHandle.createReadStream({ highWaterMark: 1 * 1024 * 1024 });
  
  readStream.on("data", (chunk) => {
    res.write(chunk)
    readStream.pause()
      setTimeout(() => {
			readStream.resume();
		}, 500);
  })




  readStream.on("end", () => {
    res.end(" Hello")
  })
  // res.end("Hello World");
});

server.listen(4000, "localhost", () => {
  console.log("Server Started");
});
