// import fs from "fs"
import fsPromises from "fs/promises"

setInterval(() => {
    console.log("Hii");
    
}, 1000 )


const content = await fsPromises.readFile("file.txt", "utf-8")
console.log(content);

