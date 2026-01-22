import fs from "node:fs/promises";

// 680ms

// console.time()
// const writeStreamHandle = await fs.open("./num1.txt", "w+");
// const writeStream = writeStreamHandle.createWriteStream()

// for (let i = 0; i <= 100000; i++){
//     writeStream.write(`${i}, `)
// }

// writeStream.end(() => {
//     console.timeEnd();
// })

console.time();

const fd = await fs.open("num4.txt", "w+");

const buff = Buffer.alloc(16 * 1024);

let offset = 0;

for (let i = 1; i <= 100000; i++) {

    let str = `${i}, `;
    let bytes = Buffer.byteLength(str)

    if (offset + bytes > 16 * 1024) {
        await fd.write(buff, 0, offset)
        offset = 0;

    }

    offset = offset + buff.write(str, offset)

}


if (offset > 0) {
    await fd.write(buff, 0, offset)
}
console.timeEnd();
