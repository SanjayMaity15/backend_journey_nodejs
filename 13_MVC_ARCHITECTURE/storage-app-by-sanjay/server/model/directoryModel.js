import { Schema, model } from "mongoose";

const directorySchema = new Schema({
    directoryName: {
        type: String,
        required: true
    },
    parentDirId: {
        type: Schema.Types.ObjectId,
        ref: "Directory",
        default: null
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Directory = model("Directory", directorySchema)
export default Directory