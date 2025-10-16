import { Router } from "express";
const router = Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import taskController from "../controllers/taskController.js";

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = taskController;
// All routes protected
router.use(protect);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", admin, createTask); // Only admin can create
router.put("/:id", updateTask); // Only admin can update
router.delete("/:id", admin, deleteTask); // Only admin can delete

export default router;
