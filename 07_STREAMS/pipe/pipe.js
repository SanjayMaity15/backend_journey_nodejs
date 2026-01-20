import { log } from "console";
import fs from "fs";
import { pipeline } from "stream";

console.time();
const readStream = fs.createReadStream(
	"C:\\Users\\sanju\\Desktop\\typescript.webm",
	{ highWaterMark: 1 * 1024 * 1024 },
);

const writeStream = fs.createWriteStream("./typescript.webm", {
	highWaterMark: 1 * 1024 * 1024,
});

// readStream.on("data", (chunk) => {
// 	const canWrite = writeStream.write(chunk);

// 	if (!canWrite) readStream.pause();
// });

// writeStream.on("drain", () => {
// 	readStream.resume();
// });

// readStream.pipe(writeStream)

pipeline(readStream, writeStream, (err) => {
	console.log(err);
});


readStream.destroy()


setInterval(() => {console.log("Working");
}, 1000)

readStream.on("end", () => {
	console.timeEnd();
});
