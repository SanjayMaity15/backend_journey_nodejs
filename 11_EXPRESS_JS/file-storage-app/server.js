import express from "express";
import fs from "fs/promises";
import cors from "cors";
import mime from "mime";
import path from "path"

const app = express();
const PORT = 8000;

app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);
app.use(express.json());



app.get("/open/:filename", async (req, res) => {
	const { filename } = req.params;
	console.log(filename);
	const stats = await fs.stat(`./public/${filename}`);
	console.log(`./public/${filename}`);
	if (stats.isDirectory()) {
		const files = await fs.readdir(`./public/${filename}`);

		const result = await Promise.all(
			files.map(async (item) => {
				const fullPathOfTheFile = `./public/${filename}/${item}`;
				const stats = await fs.stat(fullPathOfTheFile);

				return {
					file: item,
					directory: stats.isDirectory(),
				};
			}),
		);

		res.send(result);
	} else {
		const readFileHandle = await fs.open(`./public/${filename}`);
		const readStream = readFileHandle.createReadStream();

		const mimeType = mime.getType(
			`./public/${decodeURIComponent(filename)}`,
		);
		console.log(mimeType);

		res.setHeader("Content-Type", mimeType);
		readStream.pipe(res);
	}
});

app.get("/download/:filename", async (req, res) => {
	const { filename } = req.params;
	let currentPath = req.query;
	currentPath = currentPath.action;
	console.log(filename);
	const readFileHandle = await fs.open(`./public/${currentPath}/${filename}`);
	const readStream = readFileHandle.createReadStream();

	const mimeType = mime.getType(
		`./public/${currentPath}/${decodeURIComponent(filename)}`,
	);
	console.log(mimeType);
	res.setHeader("Content-Type", mimeType);
	res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

	readStream.pipe(res);
});

app.put("/rename", async (req, res) => {
	const { isEdit, rename, currentPath } = req.body;

	await fs.rename(
		`./public/${currentPath}/${isEdit}`,
		`./public/${currentPath}/${rename}`,
	);

	res.send("Success");
});

app.delete("/delete/:filename", async (req, res) => {
	const { filename } = req.params;
	const { currentPath } = req.body;

	const fullPath = `./public/${currentPath}/${filename}`;
	const stats = await fs.stat(fullPath);
	if (stats.isDirectory) {
		await fs.rm(fullPath, { recursive: true, force: true });
	} else {
		await fs.unlink(fullPath);
	}

	res.send("Success");
});

app.post("/create-folder", async (req, res) => {
	try {
		const { foldername, currentPath } = req.body;

		await fs.mkdir(`./public/${currentPath}/${foldername}`);

		res.send("Success");
	} catch (error) {
		console.log(error);
	}
});

app.post("/upload", async (req, res) => {
	console.log("first")
	try {
		const fileName = req.headers["x-original-name"];
		const currentPath = req.headers["current-path"];
		console.log({fileName, currentPath})


		const writeFileHandle = await fs.open(`./public/${currentPath}/${fileName}`, "w+")
		const writeStream = writeFileHandle.createWriteStream()

		req.pipe(writeStream);

		res.send("Success")

	} catch (error) {
		console.log(error);
	}
});

app.get("/", async (req, res) => {	
	const files = await fs.readdir("./public");

	const result = await Promise.all(
		files.map(async (item) => {
			const fullPathOfTheFile = `./public/${item}`;
			const stats = await fs.stat(fullPathOfTheFile);

			return {
				file: item,
				directory: stats.isDirectory(),
			};
		}),
	);

	res.send(result);
});

app.listen(PORT, () => {
	console.log(`<- SERVER IS RUNNING AT PORT ${PORT} ->`);
});
