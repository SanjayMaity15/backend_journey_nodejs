import fs, { read } from "fs";
import { pipeline } from "stream";

console.time();
const readStream = fs.createReadStream(
    "C:\\Users\\sanju\\Desktop\\typescript.webm",
    { highWaterMark: 1 * 1024 * 1024 },
);

const writeStream = fs.createWriteStream("./typescript.webm", {
    highWaterMark: 1 * 1024 * 1024,
});

pipeline(readStream, writeStream, (err) => {
    console.log("err : ", err);
});


readStream.on("end", () => {
    console.timeEnd()
})