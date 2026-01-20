import fs from "fs";

console.time();

// for (let i = 1; i <= 100000; i++) {
// 	fs.appendFileSync("./number.txt", `${i}, `);
// }

// using stream

const writeStream = fs.createWriteStream("./num.txt");

for (let i = 1; i <= 100000; i++) {
	writeStream.write(`${i}, `);
}

writeStream.end();

writeStream.on("finish", () => {
	console.timeEnd();
});
