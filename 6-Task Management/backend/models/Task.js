import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default model("Task", taskSchema);
