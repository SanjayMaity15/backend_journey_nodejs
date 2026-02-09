import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/populate");
        console.log("DB connected succesfully")
    } catch (error) {
        console.log("DB connection failed")
        process.exit(1)
    }
}