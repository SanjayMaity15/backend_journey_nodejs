import { createClient } from "redis";

const rediClient = await createClient().connect();

export { rediClient };
