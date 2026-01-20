import fs from "fs/promises"

const fileHandle = await fs.open("./file1.txt", "w+")


const { bytesWritten, buffer } = await fileHandle.write("abcdefgh")


console.log(buffer);
console.log(bytesWritten);


const { bytesRead, buffer: readBuffer } = await fileHandle.read({
    position : 0
})
console.log(bytesRead, readBuffer);




