import express from "express";
import { rm, writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with { type: "json" };
import filesData from "../filesDB.json" with { type: "json" };
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

// Read
router.get("/:id?", async (req, res) => {
	const user = req.user;
	const _id = req.params.id ? new ObjectId(req.params.id) : user.rootDirId;
	const { db } = req;

	// Find the directory and verify ownership
	const directoryData = await db.collection("directories").findOne({ _id });

	// console.log(directoryData)

	if (!directoryData) {
		return res.status(404).json({
			error: "Directory not found or you do not have access to it!",
		});
	}

	const files = await db
		.collection("files")
		.find({ parentDirId: directoryData._id })
		.toArray();

	const directories = await db
		.collection("directories")
		.find({ parentDirId: _id })
		.toArray();

	// console.log(directories)

	return res.status(200).json({
		...directoryData,
		files: files.map((dir) => ({ ...dir, id: dir._id })),
		directories: directories.map((dir) => ({ ...dir, id: dir._id })),
	});
});

router.post("/:parentDirId?", async (req, res, next) => {
	const user = req.user;
	const _id = req.params.parentDirId
		? new ObjectId(req.params.parentDirId)
		: user.rootDirId;
	const dirname = req.headers.dirname || "New Folder";
	const db = req.db;

	try {
		const parentDir = await db.collection("directories").findOne({ _id });

		if (!parentDir)
			return res
				.status(404)
				.json({ message: "Parent Directory Does not exist!" });

		await db.collection("directories").insertOne({
			name: dirname,
			parentDirId: _id,
			userId: user._id,
		});
		return res.status(200).json({ message: "Directory Created!" });
	} catch (err) {
		next(err);
	}
});

router.patch("/:id", async (req, res, next) => {
	const user = req.user;
	const { id } = req.params;
	const { newDirName } = req.body;
	const db = req.db;

	try {
		const dirData = await db.collection("directories").updateOne(
			{
				_id: new ObjectId(id),
				userId: user._id,
			},
			{
				$set: { name: newDirName },
			},
		);

		res.status(200).json({ message: "Directory Renamed!" });
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	const user = req.user;
	const { id } = req.params;
	const db = req.db;
	const dirObjId = new ObjectId(id);

	const deleteDirectory = await db.collection("directories").findOne({
		_id: dirObjId,
		userId: req.user._id,
	});

	if (!deleteDirectory) {
		return res.status(404).json({
			message: "Directory not found",
		});
	}

	async function directoryContent(id) {
		let dirInTheDirectory = await db
			.collection("directories")
			.find({ parentDirId: id }, { projection: { _id: 1 } })
			.toArray();

		let filesInTheDirectory = await db
			.collection("files")
			.find({ parentDirId: id }, { projection: { _id: 1, extension: 1 } })
			.toArray();

		for (const dir of dirInTheDirectory) {
			const {
				dirInTheDirectory: childDir,
				filesInTheDirectory: childFile,
			} = await directoryContent(dir._id);

			dirInTheDirectory.push(...childDir);
			filesInTheDirectory.push(...childFile);
		}

		return { dirInTheDirectory, filesInTheDirectory };
	}


	const { dirInTheDirectory, filesInTheDirectory } =
		await directoryContent(dirObjId);

	/* delete files from disk */
	for (const file of filesInTheDirectory) {
		await rm(`./storage/${file._id}${file.extension}`);
	}

	/* delete files from DB */
	if (filesInTheDirectory.length) {
		await db.collection("files").deleteMany({
			_id: { $in: filesInTheDirectory.map((f) => f._id) },
		});
	}

	/* delete directories (children + root) */
	const allDirIds = [...dirInTheDirectory.map((d) => d._id), dirObjId];

	await db.collection("directories").deleteMany({
		_id: { $in: allDirIds },
	});


	return res.status(200).json({
		message : "Successfully delete directory"
	})
});

export default router;
