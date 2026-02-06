import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/test");

await client.connect()

const db = client.db()

// ! Add validation during collection creation

// const userCollection = await db.createCollection("users", {
//     validator: {
//         username: {
//             $type: "string"
//         },
//         age: {
//             $type: "int",
//             $gte: 18,
//             $lte: 60
//         }

//     }
// })

const userCollection = db.collection("users")

// const res1 = await db.command({
// 	collMod: "users",
// 	validator: {
// 		name: {
// 			$type: "string",
// 		},
// 		age: {
// 			$type: "int",
// 			$gte: 18,
// 			$lte: 60,
// 		},
// 	},
// });

try {
    const res = await userCollection.insertOne({
		username: "Sanj Maity",
		age: 45,
	});
} catch (error) {
    console.log(error)
}


// const expenseCollection = await db.listCollections().toArray()

// console.log(expenseCollection[0].options)

