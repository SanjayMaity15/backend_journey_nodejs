const myBuffer = new ArrayBuffer(1.5 * 1024 * 1024 * 1024);

const view = new DataView(myBuffer);

view.setInt8(0, 80);

for (let i = 0; i < view.byteLength; i++) {
	view.setInt8(i, i);
}

console.log(myBuffer);
