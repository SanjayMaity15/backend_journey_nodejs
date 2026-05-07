import { createClient } from "redis"

const rediClient = await createClient().connect()

async function getJSON(key) {
    const value = await rediClient.get(key);
    return JSON.parse(value)
}

async function setJSON(key, value) {
    return await rediClient.set(key, JSON.stringify(value))
}

export { rediClient, getJSON, setJSON };