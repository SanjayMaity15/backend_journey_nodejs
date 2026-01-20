import fs from "fs"

// const fd1 = fs.openSync("file1.txt")
// const fd2 = fs.openSync("file2.txt")
// const fd3 = fs.openSync("file3.txt")


// console.log({fd1, fd2, fd3});



// reading file using file descriptor


const fd = fs.openSync("./file1.txt", "w") //w represet open in write mode by deafult it is read mode" r"  then have other like "a " append mode etc



// const my_buffer = Buffer.alloc(8)

// fs.read(fd, {
//     buffer: my_buffer,
//     position: 2,
//     length: 5
// }, (err, bytesRead, buffer) => {
//     // console.log({err, bytesRead, buffer});

    
//     console.log(buffer.byteLength);
//     console.log(buffer.toString());
// })

// const buff = Buffer.from("123456");


// fs.write(fd, buff, (err, byteWritten, buffer) => {
//     console.log(err);
//     console.log(byteWritten);
//     console.log(buffer);
// })