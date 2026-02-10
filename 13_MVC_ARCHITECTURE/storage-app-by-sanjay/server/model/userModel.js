import { Schema, model } from "mongoose"

const userSchema = new Schema({
	username: {
		type: String,
		minLength: 3,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		match: [
			/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
			"Please use a valid email address",
		],
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    rootDirId: {
        type: Schema.Types.ObjectId,
        ref: "Directory"
    }
});

const User = model("User", userSchema)
export default User