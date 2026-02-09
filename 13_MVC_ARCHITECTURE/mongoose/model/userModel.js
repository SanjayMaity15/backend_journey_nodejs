import { model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
            minLength: 3,
            required: true
		},
		email: {
			type: String,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required: true
        },
        age: {
            type: Number,
            min: 18,
            max: 60,
            required: true
        }
        
	},
	{ timestamps: true, strict: true },
);


const User = model("User", userSchema)
export default User;
