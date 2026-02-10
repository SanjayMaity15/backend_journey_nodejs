import { Schema, model } from "mongoose"

const fileSchema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    extenstion: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parentDirId: {
        type: Schema.Types.ObjectId,
        ref:"Directory"
    }
})

const File = model("File", fileSchema)
export default File