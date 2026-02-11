import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		age: {
			type: Number,
		},
		isAdult: {
			type: Boolean,
			default: null,
		},
	},
	{
		strict: "throw",
		timestamps: true,
		// virtuals: {
		//     upperCaseName() {
		//         return this.name.toUpperCase()
		//     }
		// }
	},
);

// ✅ Define virtual correctly

// userSchema.virtual("upperCaseName").set(function (value) {
//   return this.name = this.name + value;
// });

// userSchema.virtual("upperCaseName").get(function () {
// 	return this.name?.toUpperCase();
// });



// These are document middleware
// userSchema.pre("save", function () {
//     this.isAdult = this.age >= 18;
    
// });

// userSchema.post("save", function (doc) {
//     console.log(`Your user name is ${this.name} and you are ${this.isAdult ? "eligible" : "not eligible"}`)
// });

// These are model middleware it like document middleware but here we can insert multiple dcoument like insertmany is a model middleware


userSchema.pre("insertMany", function (docx) {
	console.log("Model middleware")
	docx.forEach(element => {
		element.isAdult = element.age >= 18;
	});
})

userSchema.post("insertMany", function (docx) {
	console.log("Model middleware")
	docx.forEach(element => {
		console.log(element)
	});
})


const User = model("User", userSchema);
export default User;
