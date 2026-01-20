process.stdin.on("data", (chunk) => {
    console.log("App.js ", chunk.toString());
    
})