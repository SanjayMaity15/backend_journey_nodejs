import fs from "fs";


console.time()
const readStream = fs.createReadStream(
    "D:\\YouTube\\YouTubeTypescript Course in 1 Shot in Hindi.mp4",
    {highWaterMark: 1 * 1024 * 1024}
);

const writeStream = fs.createWriteStream("./typescript.mp4")


readStream.on("data", (chunk) => {
    const isEmpty = writeStream.write(chunk);

    if (!isEmpty) {
        readStream.pause()
    }
})


writeStream.on("drain", () => {
    readStream.resume()
})

writeStream.end()
console.log(writeStream.writableEnded);

readStream.on("end", () => {
    console.timeEnd()
})