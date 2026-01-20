
// import fs from "fs"
// import { pipeline } from "stream";


// console.time()
// const readStream = fs.createReadStream(
//     "C:\\Users\\sanju\\Desktop\\typescript.webm",
//     {
//         highWaterMark: 1 * 1024 * 1024
//     }
// );


// const writeStream = fs.createWriteStream("./type.webm", {
//     highWaterMark: 1 * 1024 * 1024
// })


// readStream.on("data", (chunk) => {
//     const canWrite = writeStream.write(chunk)

//     if (!canWrite) {
//         readStream.pause()
//     }
// })


// writeStream.on("drain", () => {
//     readStream.resume()
// })


// 2nd way pipe can do but not built in error handaling but pipeling has inbuilt error handling

// pipeline(readStream, writeStream, (err) => {
//     console.log(err);
    
// })



// readStream.on("end", () => {
//     writeStream.end()
//     console.timeEnd()
// })






// Every process has dat stream this include

// 1.stdin - standard input  readable
// 1.stdout - standard output writeable
// 1.stderr - standard error  writeable


// console.log(process.stdin);

// process.stdout.write("Hello\n"); //it is like how console.log works behind the scence

// process.stderr.write("Error in process\n"); //how error print


// process.stdin.on("data", (chunk) => {
//     console.log(chunk.toString());
    
// })