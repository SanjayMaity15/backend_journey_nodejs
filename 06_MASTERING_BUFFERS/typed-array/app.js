const myBuffer1 = new ArrayBuffer(8)
const myBuffer2 = new ArrayBuffer(8)
const myBuffer3 = new ArrayBuffer(8)
const typedArray8 = new Int8Array(myBuffer1).fill(34)
const typedArray16 = new Int16Array(myBuffer2).fill(34356)
const typedArray32 = new Int32Array(myBuffer3).fill(3435656)

console.log(typedArray8);
console.log(typedArray16);
console.log(typedArray32);

console.log(myBuffer1);
console.log(myBuffer2);
console.log(myBuffer3);


