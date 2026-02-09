import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, strict: true
})

const Todo = model("Todo", todoSchema)
export default Todo