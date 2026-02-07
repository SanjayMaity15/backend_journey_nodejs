import { client, connectDB } from "./dbConnedtion.js";

const db = await connectDB()

try {
    
await db.command({
	collMod: "users",
	validator: {
		$jsonSchema: {
			required: ["_id", "name", "email", "password", "rootDirId"],
			properties: {
				_id: {
					bsonType: "objectId",
				},
				name: {
					bsonType: "string",
                    minLength: 3,
                    
				},
				email: {
					bsonType: "string",
					pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
				},
				password: {
					bsonType: "string",
					minLength: 4,
				},
				rootDirId: {
					bsonType: "objectId",
				},
			},
			additionalProperties: false,
		},
	},
});
await db.command({
	collMod: "directories",
	validator: {
		$jsonSchema: {
			required: ["_id", "name", "userId", "parentDirId"],
			properties: {
				_id: {
					bsonType: "objectId",
				},
				name: {
					bsonType: "string",
				},
				parentDirId: {
					bsonType: ["objectId", "null"],
				},
				userId: {
					bsonType: "objectId",
				},
			},
			additionalProperties: false,
		},
	},
});
await db.command({
	collMod: "files",
	validator: {
		$jsonSchema: {
			required: ["_id", "name", "userId", "parentDirId", "extension"],
			properties: {
				_id: {
					bsonType: "objectId",
				},
				name: {
					bsonType: "string",
				},
				extension: {
					bsonType: "string",
				},
				parentDirId: {
					bsonType: "objectId",
				},
				userId: {
					bsonType: "objectId",
				},
			},
			additionalProperties: false,
		},
	},
});
} catch (error) {
    console.log("error during setup", error)
} finally {
    client.close()
}