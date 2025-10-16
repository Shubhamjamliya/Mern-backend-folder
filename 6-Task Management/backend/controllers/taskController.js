import Task from "../models/Task.js";

// Get all tasks (with pagination)
export const getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  let query = {};
  if (req.user.role !== "admin") {
    query.assignedTo = req.user._id;
  }

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ dueDate: 1 })
    .skip(skip)
    .limit(limit)
    .populate("assignedTo", "name email"); // populate assigned user

  res.json({ tasks, page, totalPages: Math.ceil(total / limit) });
};

// Get single task
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email"); // <-- populate here too
  if (task) res.json({ task });
  else res.status(404).json({ message: "Task not found" });
};

// Create new task
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    assignedTo,
    createdBy: req.user._id,
  });

  const populatedTask = await task.populate("assignedTo", "name email"); // populate after creation
  res.status(201).json({ task: populatedTask });
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const { title, description, dueDate, priority, status, assignedTo } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.priority = priority || task.priority;
  task.status = status || task.status;
  task.assignedTo = assignedTo || task.assignedTo;

  const updatedTask = await task.save();
  const populatedTask = await updatedTask.populate("assignedTo", "name email"); // populate updated task
  res.json({ task: populatedTask });
};

// Delete task
export const deleteTask = async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task removed" });
};

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
