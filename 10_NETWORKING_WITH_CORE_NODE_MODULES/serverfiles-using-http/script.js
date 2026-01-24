console.log("hello world")

let str = "This is , a cow   to a "

console.log(str.split(" ").filter((item) => item !== "" && item != ",").join("-"));
