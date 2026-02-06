import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017");

await client.connect()

const db = await client.db("expenseDB")

const expenseCollection = await db.createCollection("expense")

// create
// const res1 = await expenseCollection.insertOne({ name: "Sanjay" });

// // read
// const res2 = await expenseCollection.find().toArray()

// const res3 = await expenseCollection.find({ amount: {$gte : 450} }).toArray();

// // update

// const res4 = await expenseCollection.updateOne({ title: "Gym membership" }, {$set: {amount: 50000}})

// // delete

// const res5 = await expenseCollection.deleteOne({
//     amount: 151.99
// })

// full replace an obj

const res6 = await expenseCollection.replaceOne({title: "Electricity bill"}, {title: "Electric bill"})

// console.log(res)

client.close()