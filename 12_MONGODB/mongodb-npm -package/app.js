import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017/");

client.connect()

const db = client.db("expenseDATA")


const allCollectionInThisDbs = await db.listCollections().toArray()

const collection = db.collection("users")

const expenses = await collection.find().toArray()

const admin = await db.admin().listDatabases()
console.log(db)

console.log(allCollectionInThisDbs)
