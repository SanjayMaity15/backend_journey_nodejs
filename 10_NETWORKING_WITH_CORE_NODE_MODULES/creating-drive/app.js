import { readdir, stat as fsStat } from "fs/promises";
import http from "http";
import fs from "fs/promises";
import mime from "mime";
import { pipeline } from "stream/promises";



const server = http.createServer(async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, X-Original-Name",
	);

	const [reqUrl, queryString] = req.url.split("?");

    if (reqUrl === "/upload" && req.method === "POST") {
        const OriginalFilename = req.headers["x-original-name"];
        
        const writeStreamHandle = await fs.open(`./storage/${OriginalFilename}`, "w")

        const writeStream = writeStreamHandle.createWriteStream()

        pipeline(req, writeStream)
        
        res.end("Success")
    }else if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}else if (reqUrl === "/" && req.method === "GET") {
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
				const itemLists = await readdir(`./storage${reqUrl}`);

				// get name + isDirectory
				const items = await Promise.all(
					itemLists.map(async (name) => {
						const stats = await fsStat(
							`./storage${reqUrl}/${name}`,
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
