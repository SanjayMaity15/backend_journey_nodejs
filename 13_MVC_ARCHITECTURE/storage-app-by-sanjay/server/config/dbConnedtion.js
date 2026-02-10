import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/storageApp")
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Error while connecting DB", error)
        process.exit(1)
    }
}