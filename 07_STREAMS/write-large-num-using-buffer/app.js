// import fs from "fs"; // Import Node's filesystem module

// // Open file for writing (synchronous)
// // 'w' flag means: create the file if it doesn't exist, or truncate it if it does
// console.time()
// const fd = fs.openSync("./numbers.txt", "w");

// // Total numbers we want to write
// const TOTAL_NUMBERS = 100000;

// // Size of our custom buffer in bytes (64 KB here)
// const BUFFER_SIZE = 16 * 1024; // 64 * 1024 = 65536 bytes

// // Preallocate a buffer of BUFFER_SIZE
// // This will temporarily hold data before writing to disk
// let buffer = Buffer.alloc(BUFFER_SIZE);

// // Offset tracks how many bytes in the buffer are currently used
// let offset = 0;

// // Loop through all numbers we want to write
// for (let i = 1; i <= TOTAL_NUMBERS; i++) {
// 	// Convert number to string and add a comma+space
// 	const str = `${i}, `;

// 	// Calculate how many bytes this string will take in the buffer
// 	const bytes = Buffer.byteLength(str);

// 	// If adding this string would exceed buffer size
// 	if (offset + bytes > BUFFER_SIZE) {
// 		// Flush current buffer content to the file
// 		fs.writeSync(fd, buffer, 0, offset);

// 		// Reset offset to 0, buffer is "empty" now
// 		offset = 0;
// 	}

// 	// Write the string into the buffer at the current offset
// 	buffer.write(str, offset);

// 	// Move offset forward by the number of bytes we just wrote
// 	offset += bytes;
// }

// // After the loop, there may still be data in the buffer
// // Write remaining content to the file
// if (offset > 0) {
// 	fs.writeSync(fd, buffer, 0, offset);
// }

// // Close the file descriptor — important to free system resources
// fs.closeSync(fd);
// console.timeEnd()
// console.log("Done writing 100,000 numbers using a custom buffer!");

import fs from "fs";

console.time();
const fd = fs.openSync("./num.txt", "w");

let offset = 0;
const buff = Buffer.alloc(16 * 1024);

for (let i = 1; i <= 100000; i++) {
	const str = `${i}, `;
	const bytes = Buffer.byteLength(str);

	if (offset + bytes > 16 * 1024) {
		fs.writeSync(fd, buff, 0, offset);
		offset = 0;
	}

	buff.write(str, offset);
	offset += bytes;

	// fs.writeSync(fd, `${i}, `);
}
if (offset > 0) {
	fs.writeSync(fd, buff, 0, offset);
}

console.timeEnd();
