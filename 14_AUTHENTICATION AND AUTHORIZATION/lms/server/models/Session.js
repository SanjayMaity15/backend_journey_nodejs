import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},	
	data: {
		type: mongoose.Schema.Types.Mixed,
		default: {
			cart: [],
		},
	},
	expiresIn: {
		type: Number,
		default: Date.now() + 30 * 24 * 60 * 60 * 1000,
	},
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
