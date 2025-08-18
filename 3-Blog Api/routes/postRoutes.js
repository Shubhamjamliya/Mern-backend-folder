import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { createPost, deletepost, getPost, getPosts, updatePost } from "../controllers/postController.js";

const router = express.Router();

//All Routes Protected
router.use(authMiddleware);

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletepost);

export default router;
