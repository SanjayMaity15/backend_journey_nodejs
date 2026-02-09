import { Schema, model } from "mongoose"

const commentSchema = new Schema({
    comment: {
        type: String,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


const Comment = model("Comment", commentSchema)
export default Comment;