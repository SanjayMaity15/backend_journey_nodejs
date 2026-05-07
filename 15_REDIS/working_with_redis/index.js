import { createClient } from "redis";

const redisClient = await createClient().connect();

// const result = await redisClient.set("name", "Sanjay Maity");

const userData = {
    name: "Sanjay Maity",
    age: 24,
    email: 'Sanjay@gmail.com'
}

const result = await redisClient.set("user", JSON.stringify(userData))

console.log(result);

redisClient.quit()
