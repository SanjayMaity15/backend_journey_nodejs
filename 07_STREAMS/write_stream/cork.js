import fs, { write } from "fs"

const writeStream = fs.createWriteStream("cork.txt")



writeStream.write("abc")
writeStream.cork()

writeStream.write("def")
writeStream.uncork()
console.log(writeStream.writableCorked);