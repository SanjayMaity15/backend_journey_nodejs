import Directory from "../model/directoryModel.js";
import File from "../model/fileModel.js";

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
        console.log("Working till ")
        return res.status(200).json({
            directories,
            files
        });
    
}