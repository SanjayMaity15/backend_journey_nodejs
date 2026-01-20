// const myBuffer = new ArrayBuffer(4)

// const uint8TypedArray = new Uint8Array(myBuffer)

// uint8TypedArray[0] = 65;
// uint8TypedArray[1] = 66;
// uint8TypedArray[2] = 67;
// uint8TypedArray[3] = 68;

// console.log(myBuffer);

// const decoder = new TextDecoder("utf-8")

// console.log(decoder.decode(myBuffer));




// ! Node js buffer

import { Buffer } from "buffer"



// const buffer1 = new Buffer.alloc(10000)
// const buffer2 = new Buffer.allocUnsafe(10000)


// console.log(buffer1.toString());
// console.log(buffer2.toString());


const s = Buffer.from("Hello World")
console.log(s);


