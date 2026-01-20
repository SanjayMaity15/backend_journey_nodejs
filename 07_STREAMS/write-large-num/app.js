    import fs from "fs";


    console.time()
const fd = fs.openSync("./file222.txt", "w")


// const buff = Buffer.alloc(16 * 1024)

    for (let i = 1; i <= 100000; i++) {
        fs.write(fd, `${i}, `, (err, writtenBytes, buffer) => {

        })

        if (i === 100000) {
            console.timeEnd();
        }
    }


    