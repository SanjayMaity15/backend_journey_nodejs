import { readdir, stat as fsStat } from "fs/promises";
import http from "http";
import fs from "fs/promises";
import mime from "mime";
import { pipeline } from "stream/promises";

const server = http.createServer(async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT,OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, X-Original-Name, Current-Path, X-New-Name, X-Old-Name",
	);

	const [reqUrl, queryString] = req.url.split("?");
	let reqMethod = reqUrl.split("/").pop();
	reqMethod = `/${reqMethod}`;
	console.log(reqMethod);
	// console.log(reqUrl.split("/"))

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	} else if (reqUrl === "/upload" && req.method === "POST") {
		const OriginalFilename = req.headers["x-original-name"];
		const currentPath = req.headers["current-path"];

		const writeStreamHandle = await fs.open(
			`./storage/${currentPath}/${OriginalFilename}`,
			"w",
		);

		const writeStream = writeStreamHandle.createWriteStream();

		pipeline(req, writeStream);

		res.end("Success");
	} else if (reqMethod === "/delete" && req.method === "DELETE") {
		const deletePath = req.headers["current-path"];
		// console.log("Delete",deletePath)

		fs.unlink(`./storage/${deletePath}`);
    } else if (reqMethod === "/rename" && req.method === "PUT") {
        const renamePath = req.headers["current-path"]
        const oldFileName = req.headers["x-old-name"]
        const renameFileName = req.headers["x-new-name"]
        // console.log("hi");
        // console.log(renamePath);
        // console.log(renameFileName);
        // console.log(oldFileName);
        // // console.log(reqMethod);
        // // console.log('Nice');

        const array = renamePath.split("/");
		let path = array.slice(0, -1).join();

        await fs.rename(`./storage/${renamePath}/`, `./storage/${path}/${renameFileName}`)

        res.end("Success")
    }
    else if (reqUrl === "/" && req.method === "GET") {
		try {
			const itemLists = await readdir("./storage");
			// get name + isDirectory
			const items = await Promise.all(
				itemLists.map(async (name) => {
					const stats = await fsStat(`./storage/${name}`);
					return { name, isDirectory: stats.isDirectory() };
				}),
			);

			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(items));
		} catch (err) {
			res.writeHead(500);
			res.end(JSON.stringify({ error: "Unable to read directory" }));
		}
	} else {
		try {
			const readStreamHandle = await fs.open(
				`./storage${decodeURIComponent(reqUrl)}`,
			);
			const stat = await readStreamHandle.stat();
			const filename = decodeURIComponent(reqUrl.split("/").pop());
			const queryParams = {};
			if (queryString) {
				const [key, value] = queryString.split("=");
				queryParams[key] = value;
			}

			if (stat.isDirectory()) {
				const itemLists = await readdir(
					`./storage${decodeURIComponent(reqUrl)}`,
				);

				// get name + isDirectory
				const items = await Promise.all(
					itemLists.map(async (name) => {
						const stats = await fsStat(
							`./storage${decodeURIComponent(reqUrl)}/${name}`,
						);
						return { name, isDirectory: stats.isDirectory() };
					}),
				);

				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(items));
				return;
			}

			if (!stat.isDirectory()) {
				if (queryParams.action === "download") {
					res.setHeader(
						"Content-Disposition",
						`attachment; filename="${filename}"`,
					);
				}
				res.setHeader(
					"Content-Type",
					mime.getType(filename) || "application/octet-stream",
				);
				res.setHeader("Content-Length", stat.size);

				const readStream = readStreamHandle.createReadStream({
					highWaterMark: 16 * 1024,
				});
				readStream.pipe(res);
			}
		} catch (error) {
			res.writeHead(404);
			res.end("File not found");
		}
	}
});

server.listen(8000, () => {
	console.log("Server is running on http://localhost:8000");
});
