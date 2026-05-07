import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

// const result = await redisClient.keys();

// const result = await redisClient.json.set("user1", "$", {
// 	name: "Sanjay",
// 	age: 25,
// 	location: { city: "Bangalore" },
// });

// const result = await redisClient.json.get("user1")

// const result = await redisClient.json.get("user1", {
// 	path: "$.location.city"
// })

// const result = await redisClient.json.numIncrBy("user1", "$.age", 5)
// ! path above way we can define

// const result = await redisClient.json.set("user1", "$.hobbies", [])

const result = await redisClient.json.arrAppend("user1", "$.hobbies", "biking")

// const result = await redisClient.json.arrPop("user1", "$.hobbies", 2);

// const result = await redisClient.json.arrLen("user1", "$.hobbies");

console.log(result);

await redisClient.quit();
