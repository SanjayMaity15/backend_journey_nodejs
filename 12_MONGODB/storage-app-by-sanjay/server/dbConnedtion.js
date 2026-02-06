import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/storageApp")

export const connectDB = async () => {
    await client.connect()

    const db = client.db();

    return db;
}


process.on("SIGINT", async () => {
    await client.close()
    console.log("Client Disconnected")
    process.exit(0)
})