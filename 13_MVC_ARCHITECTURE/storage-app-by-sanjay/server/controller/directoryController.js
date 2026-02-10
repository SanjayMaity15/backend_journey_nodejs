import Directory from "../model/directoryModel.js";
import File from "../model/fileModel.js";
import { ObjectId } from "mongodb";

export const getDirectoryData = async (req, res) => {
    
        const user = req.user;
        const _id = req.params.id ? new ObjectId(req.params.id) : user.rootDirId;
        
		
    
        // Find the directory and verify ownership
        const directoryData = await Directory.findOne({ _id });
    
        // console.log(directoryData)
    
        if (!directoryData) {
            return res.status(404).json({
                error: "Directory not found or you do not have access to it!",
            });
        }
    
        const files = await File
            .find({ parentDirId: directoryData._id })
            
    
        const directories = await Directory
            .find({ parentDirId: _id })
            
    
        // console.log(directories)
        
        return res.status(200).json({
            directories,
            files
        });
    
}


// create directory

export const createDirectory = async (req, res, next) => {
	const user = req.user;
	const _id = req.params.parentDirId
		? new ObjectId(req.params.parentDirId)
		: user.rootDirId;
	const dirname = req.headers.dirname || "New Folder";
	

	try {
		const parentDir = await Directory.findOne({ _id });

		if (!parentDir)
			return res
				.status(404)
				.json({ message: "Parent Directory Does not exist!" });

		await Directory.create({
			directoryName: dirname,
			parentDirId: _id,
			author: user._id,
		});
		return res.status(200).json({ message: "Directory Created!" });
	} catch (err) {
		next(err);
	}
};


// rename directory

export const renameDirectory = async (req, res, next) => {
	const user = req.user;
	const { id } = req.params;
	const { newDirName } = req.body;
	

	try {
		const dirData = await Directory.updateOne(
			{
				_id: new ObjectId(id),
				author: user._id,
			},
			{
				$set: { directoryName: newDirName },
			},
		);

		res.status(200).json({ message: "Directory Renamed!" });
	} catch (err) {
		next(err);
	}
};


export const deleteDirectory = async (req, res) => {
	const user = req.user;
	const { id } = req.params;
	
	const dirObjId = new ObjectId(id);

	const deleteDirectory = await Directory.findOne({
		_id: dirObjId,
		author: req.user._id,
	});

	if (!deleteDirectory) {
		return res.status(404).json({
			message: "Directory not found",
		});
	}

	async function directoryContent(id) {
		let dirInTheDirectory = await Directory
			.find({ parentDirId: id }, { projection: { _id: 1 } })
			

		let filesInTheDirectory = await File
			.find({ parentDirId: id }, { projection: { _id: 1, extension: 1 } })
			

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
		await File.deleteMany({
			_id: { $in: filesInTheDirectory.map((f) => f._id) },
		});
	}

	/* delete directories (children + root) */
	const allDirIds = [...dirInTheDirectory.map((d) => d._id), dirObjId];

	await Directory.deleteMany({
		_id: { $in: allDirIds },
	});

	return res.status(200).json({
		message: "Successfully delete directory",
	});
};