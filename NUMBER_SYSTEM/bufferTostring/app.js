import { readFile } from "node:fs/promises";

const arr = [];

function bufferToString(buffer) {
	buffer.forEach((element) => {
		arr.push(element.toString(2).padStart(8, "0"));
	});
}

const content = await readFile("./file.txt");

bufferToString(content);

let str = "";
arr.forEach((elem) => {
	const decimal = parseInt(elem, 2);
	const char = String.fromCharCode(decimal);
	str += char;
});

console.log(str);
