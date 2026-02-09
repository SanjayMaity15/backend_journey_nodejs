import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { connectDB } from "./db/db.js";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(4000, () => {
  connectDB()
  console.log(`Server is running`);
});
