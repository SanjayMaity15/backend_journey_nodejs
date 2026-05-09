import { createClient } from "redis";

const redisClient = createClient({
	username: "default",
	password: "",
	socket: {
		host: "",
		port: "",
	},
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

export { redisClient };
