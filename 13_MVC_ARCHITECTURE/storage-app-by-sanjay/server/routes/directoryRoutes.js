import express from "express";
import { rm } from "fs/promises";


// import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";
import checkAuth from "../middlewares/authMiddleware.js";
import { createDirectory, deleteDirectory, getDirectoryData, renameDirectory } from "../controller/directoryController.js";

const router = express.Router();

// router.param("parentDirId", validateIdMiddleware);
// router.param("id", validateIdMiddleware);

// Read
router.get("/:id?", checkAuth, getDirectoryData);

router.post("/:parentDirId?", checkAuth, createDirectory );

router.patch("/:id", checkAuth, renameDirectory);

router.delete("/:id", checkAuth, deleteDirectory);

export default router;
