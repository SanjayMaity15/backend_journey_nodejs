import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String
    },


}, {
    strict: "throw",
    timestamps: true,
    // virtuals: {
    //     upperCaseName() {
    //         return this.name.toUpperCase()
    //     }
    // }
})


// ✅ Define virtual correctly

userSchema.virtual("upperCaseName").set(function (value) {
  return this.name = this.name + value;
});

userSchema.virtual("upperCaseName").get(function () {
	return this.name?.toUpperCase();
});

const User = model("User", userSchema)
export default User;