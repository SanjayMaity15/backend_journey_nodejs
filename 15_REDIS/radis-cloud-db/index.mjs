import { redisClient } from "./redis.mjs";

// const result = await redisClient.set("name", "Sanjay Maity")

const result = await redisClient.get("name")

console.log(result);

await redisClient.quit()