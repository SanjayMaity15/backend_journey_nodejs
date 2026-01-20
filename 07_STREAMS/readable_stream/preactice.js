// import { readFile, writeFile } from "node:fs/promises";

// // const content = await readFile(
// // 	"D:\\YouTube\\YouTubeReact Lifecycle Methods ｜ useEffect Hook.webm",
// // );

// await writeFile("./copy.webm", content);

// console.log(content.toString("utf-8"));

// import {
// 	appendFile,
// 	createReadStream,
// 	createWriteStream,
// 	read,
// 	writeFile,
// } from "node:fs";

// const readStream = createReadStream(
// 	"D:\\YouTube\\YouTubeTypescript Course in 1 Shot in Hindi.mp4",
// 	{
// 		highWaterMark: 1 * 1024 * 1024,
// 	},
// );

// readStream.on("data", (chunk) => {
// 	console.log("---- New Chunk ----");
// 	// console.log(chunk.byteLength)
// 	// console.log(readStream.bytesRead);
// 	// console.log(readStream.readableHighWaterMark);

// 	if (readStream.bytesRead === readStream.readableHighWaterMark) {
// 		writeFile("./part.mp4", chunk, (err) => {
// 			if (err) {
// 				console.error("Error writing chunk:", err);
// 			} else {
// 				console.log("Chunk written successfully");
// 			}
// 		});
// 	} else {
// 		appendFile("./part.mp4", chunk, (err) => {
// 			if (err) {
// 				console.error("Error appending chunk:", err);
// 			} else {
// 				console.log("Chunk appended successfully");
// 			}
// 		});
// 	}
// });
    

import { appendFile, createReadStream, createWriteStream, read, writeFile } from "node:fs";

console.time("readStream");
const readStream = createReadStream("./file.txt", {
    highWaterMark: 4, // 4 bytes                                    
}); 

readStream.on("data", (chunk) => {
    if (readStream.bytesRead === readStream.readableHighWaterMark) {
        writeFile("./part.txt", chunk, (err) => {
            if (err) {
                // console.error("Error writing chunk:", err);
            } else {
                // console.log("Chunk written successfully");
            }
        });
    } else {
        appendFile("./part.txt", chunk, (err) => {
            if (err) {
                // console.error("Error appending chunk:", err);
            } else {
                // console.log("Chunk appended successfully");
            }
        });   
    }

    // readStream.pause(); // Pause the stream after processing each chunk
    // setTimeout(() => {
    //     readStream.resume(); // Resume the stream after a delay
    // }, 1000);       

    
});     


readStream.on("end", () => {
    console.timeEnd("readStream");
});     

readStream.on("error", (err) => {
    console.error("Error reading file:", err);
}); 


readStream.on("close", () => {
    console.log("Read stream closed");
}); 