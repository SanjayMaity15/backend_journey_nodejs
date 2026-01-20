const myBuffer = new ArrayBuffer(8)

const typeArray = new Uint8Array(myBuffer).fill(56)



const hex = [0x70, 0x72, 0x6F, 0x63, 0x6F, 0x64, 0x72, 0x72]


for (let i = 0; i < typeArray.byteLength; i++){
    typeArray[i] = hex[i]
}

console.log(typeArray);

const decoder = new TextDecoder("utf-8")

console.log(decoder.decode(typeArray));





