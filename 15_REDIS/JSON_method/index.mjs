import { getJSON, rediClient, setJSON } from "./redis.mjs";

const user = {
    username: "Sanjay Maity",
    age: 24,
    email: "sanjay@gmail.com",
    address: {
        vill: "Anantapur"
    }
}

// const result = await setJSON("user", user)
const result = await getJSON("user")
console.log(result);

await rediClient.quit()
