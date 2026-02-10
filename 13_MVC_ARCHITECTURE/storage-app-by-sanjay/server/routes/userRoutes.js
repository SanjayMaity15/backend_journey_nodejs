import express from "express"
import { getCurrentUser, handleLogout, login, signup } from "../controller/userController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", signup);

router.post("/login", login);

router.post("/logout", checkAuth,  handleLogout);

router.get("/", checkAuth, getCurrentUser)

export default router;
