#!/usr/bin/env node

import fs from "node:fs/promises";

console.log(process.argv);
const source = process.argv[2]
const destination = process.argv[3]


try {
	const readImageFile = await fs.readFile(source);
	fs.writeFile(destination, readImageFile);
} catch (error) {
    
    
    fs.appendFile("./error.log", `\n\n${new Date().toLocaleTimeString()} \n${error.message} \n${error.stack}`)

    console.error("You can see error details in ./error.log file");
    
}
