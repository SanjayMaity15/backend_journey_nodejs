import { watch } from "node:fs";
import { copyFile, cp, mkdir, readFile, rename, rm, rmdir, unlink, writeFile } from "node:fs/promises"

// const content = await readFile("C:\\Users\\sanju\\Music\\sm.png")
 
// writeFile("nodejs.png", content)


// writeFile("text.js", '')
// mkdir("src" )

// copyFile("nodejs.png", "./src/backend.png")
// cp("one", "./src/one", { recursive: true })

// rmdir("./src/one")

// rm("src",{recursive: true})

// rename("nodejs.png","node.png")

// mkdir("src")

// rename("src","hello")

// unlink("text.js")

// rm("hello", {recursive:true})

watch("app.js", (eventType) => {
    console.log(eventType);
    
})
