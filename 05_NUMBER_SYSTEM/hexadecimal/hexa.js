const num = 1114

const decimalToOctal = (num.toString(8))
const decimalToHexa = (num.toString(16))
const decimalToBinary = (num.toString(2))

console.log(decimalToBinary);
console.log(decimalToHexa);
console.log(decimalToOctal);


const octalToDecimal = parseInt(decimalToOctal,8)
const hexaToDecimal = parseInt(decimalToHexa, 16)
const binaryToDecimal = parseInt(decimalToBinary, 2)


console.log(octalToDecimal);
console.log(hexaToDecimal);
console.log(binaryToDecimal);

