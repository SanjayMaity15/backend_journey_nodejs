import { createClient } from "redis";

const redisClient = createClient({
	username: "default",
	password: "",
	socket: {
		host: "",
		port: "",
	},
});

redisClient.on("error", (err) => console.log("Redis client Error", err));

await redisClient.connect();

export {redisClient}
