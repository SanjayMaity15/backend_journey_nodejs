import fs from 'fs/promises'

setInterval(() => {
    console.log("hello");
    
}, 5)

const content = await fs.readFile("./text.txt", "utf-8")
console.log("reding");

// console.log(content);

