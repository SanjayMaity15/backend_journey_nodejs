import path from "path";
import { createWriteStream } from "fs";
import { rm, unlink } from "fs/promises";
import mongoose from "mongoose";

import Directory from "../model/directoryModel.js";
import File from "../model/fileModel.js";

export const uploadFile = async (req, res) => {
	try {
		// 1️⃣ Resolve parent directory
		const parentDirId = req.params.parentDirId ?? req.user.rootDirId;

		if (!parentDirId || !mongoose.Types.ObjectId.isValid(parentDirId)) {
			return res
				.status(400)
				.json({ error: "Invalid parent directory id" });
		}

		console.log(req.user._id);
		const parentDirData = await Directory.findOne({
			_id: parentDirId,
			author: req.user._id,
		});

		console.log(parentDirId);

		if (!parentDirData) {
			return res
				.status(404)
				.json({ error: "Parent directory not found!" });
		}

		// 2️⃣ File info
		const filename = req.headers.filename || "untitled";
		const extension = path.extname(filename);

		// 3️⃣ Create DB record
		const fileDoc = await File.create({
			fileName: filename,
			extension,
			parentDirId: parentDirData._id,
			author: req.user._id,
		});

		const fullFileName = `${fileDoc._id}${extension}`;
		const filePath = path.join("storage", fullFileName);

		// 4️⃣ Stream to disk
		const writeStream = createWriteStream(filePath);
		req.pipe(writeStream);

		// 5️⃣ Success
		writeStream.on("finish", () => {
			return res.status(201).json({
				message: "File uploaded",
				fileId: fileDoc._id,
			});
		});

		// 6️⃣ Error handling + rollback
		writeStream.on("error", async () => {
			await File.deleteOne({ _id: fileDoc._id });
			await unlink(filePath).catch(() => {});
			return res.status(500).json({ error: "File upload failed" });
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const viewFile = async (req, res) => {
	const { id } = req.params;

	const fileData = await File.findOne({ _id: id, author: req.user._id });

	// Check if file exists
	if (!fileData) {
		return res.status(404).json({ error: "File not found!" });
	}

	// If "download" is requested, set the appropriate headers
	const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;

	if (req.query.action === "download") {
		return res.download(filePath, fileData.name);
	}

	// Send file
	return res.sendFile(filePath, (err) => {
		if (!res.headersSent && err) {
			return res.status(404).json({ error: "File not found!" });
		}
	});
};

export const renameFile = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		const fileData = await File.findByIdAndUpdate(
			{
				_id: id,
				author: req.user._id,
			},
			{ $set: { fileName: req.body.newFileName } },
			{ new: true },
		);

		return res.status(200).json({ message: "Renamed", fileData });
	} catch (err) {
		err.status = 500;
		next(err);
	}
};

export const deleteFile = async (req, res, next) => {
	const { id } = req.params;

	try {
		const fileData = await File.findByIdAndDelete({
			_id: id,
			author: req.user._id,
		});

		console.log(fileData)

		// Remove file from filesystem
		await rm(`./storage/${id}${fileData.extension}`, { recursive: true });

		// Remove file from DB

		return res.status(200).json({ message: "File Deleted Successfully" , fileData});
	} catch (err) {
		next(err);
	}
};
