import fs from "node:fs/promises"
import { pipeline } from "node:stream/promises"

const readFileHandle = await fs.open("C:\\Users\\sanju\\Desktop\\typescript.webm")

const writeFileHandle = await fs.open("./type.webm", "w")

const readStream = readFileHandle.createReadStream({ highWaterMark: 1024 * 1024 })

const writeStream = writeFileHandle.createWriteStream({ highWaterMark: 1024 * 1024 })

pipeline(readStream, writeStream)