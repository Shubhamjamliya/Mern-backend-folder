import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

// Admin-only routes
router.get("/", admin, getUsers);
router.get("/:id", admin, getUserById);
router.post("/", admin, createUser);
router.put("/:id", admin, updateUser);
router.delete("/:id", admin, deleteUser);

export default router;
