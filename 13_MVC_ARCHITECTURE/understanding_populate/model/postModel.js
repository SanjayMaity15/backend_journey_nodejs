import { Schema, model } from "mongoose"

const postSchema = new Schema({
    postName: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = model("Post", postSchema)
export default Post