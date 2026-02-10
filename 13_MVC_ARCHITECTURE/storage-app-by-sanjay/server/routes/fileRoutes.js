import express from "express";

import checkAuth from "../middlewares/authMiddleware.js";
import { deleteFile, renameFile, uploadFile, viewFile } from "../controller/fileController.js";



// import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
// import { ObjectId } from "mongodb";

const router = express.Router();

// router.param("parentDirId", validateIdMiddleware);
// router.param("id", validateIdMiddleware);

router.post("/:parentDirId?", checkAuth, uploadFile);

router.get("/:id", checkAuth, viewFile);

router.patch("/:id", checkAuth, renameFile);

router.delete("/:id",  checkAuth, deleteFile);

export default router;
