import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
let a = 10;

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/directory", directoryRoutes);
app.use("/file", fileRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: "Something went wrong!" });
});

app.listen(4000, () => {
  console.log(`Server Started at ${4000}`);
});
