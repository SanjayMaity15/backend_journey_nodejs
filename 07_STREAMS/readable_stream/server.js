// import { readFile } from "fs/promises"

// const content = await readFile("./file.txt")
// console.log(content.toString());

// use of stream

import fs, { read } from "fs";

// console.time()
// const readStream = fs.createReadStream("D:\\YouTubeTypeScript Domination - Full Course.webm", {highWaterMark: 1 * 1024 * 1024})

// console.time()
// readStream.on("data", (chunk) => {

//     fs.appendFile("./typescript.webm", chunk, (err) => {
//         // console.log(err);

//         if (chunk.byteLength < 1 * 1024 * 1024)

//            console.timeEnd();

//     })

// })

// const readStream = fs.createReadStream("file.txt", {highWaterMark: 8})

// let readCount = 0;
// let progress = 0;
// readStream.on("data", (chunk) => {

//     fs.appendFile("s.webm", chunk, (err) => {

//     })
//     progress = progress + chunk.byteLength;
//     console.log("progress = ", Math.floor((progress / 2553975870) * 100));

//     readCount++;

// })

// readStream.on("end", () => {
//     console.log(readCount);
//     console.timeEnd()
// })

const readStream = fs.createReadStream("./file.txt", { highWaterMark: 4 });

readStream.on("data", (chunk) => {
	if (readStream.bytesRead === readStream.readableHighWaterMark) {
		fs.writeFile("new.txt", chunk, () => {});
	} else {
		fs.appendFile("new.txt", chunk, () => {});
	}

	
	readStream.pause();
	setTimeout(() => {
		readStream.resume();
	}, 500);
});
