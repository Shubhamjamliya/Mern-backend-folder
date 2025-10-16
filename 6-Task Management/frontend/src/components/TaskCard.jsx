import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const TaskCard = ({ task, refresh }) => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);

  // 🗑️ Delete Task
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(`/tasks/${task._id}`);
      toast.success("Task deleted!");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  // 🔄 Toggle Task Status
  const handleStatusToggle = async () => {
    try {
      await axiosInstance.put(`/tasks/${task._id}`, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      toast.success("Task status updated!");
      refresh();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // ⚙️ Change Priority (move between lists)
  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;
    if (newPriority === task.priority) return;

    setUpdating(true);
    try {
      await axiosInstance.put(`/tasks/${task._id}`, { priority: newPriority });
      toast.success("Priority updated!");
      refresh();
    } catch (err) {
      toast.error("Failed to update priority");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === "high"
            ? "bg-red-100 text-red-700"
            : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
            }`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>

      {/* Meta Info */}
      <div className="mt-3 space-y-1 text-sm">
        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Due:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p
          className={`font-medium ${task.status === "completed" ? "text-green-600" : "text-orange-600"
            }`}
        >
          Status: {task.status}
        </p>
        {task.assignedTo && (
          <p className="text-gray-500">
            Assigned to:{" "}
            <span className="font-medium text-gray-700">
              {task.assignedTo.name || "Unassigned"}
            </span>
          </p>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-between items-center">
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
            onClick={() => navigate(`/task/${task._id}`)}
          >
            View Details
          </button>

          <button
            className={`${task.status === "pending"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
              } text-white px-3 py-1.5 rounded-md text-sm transition`}
            onClick={handleStatusToggle}
          >
            {task.status === "pending" ? "Mark Completed" : "Mark Pending"}
          </button>


        </div>

        {/* Priority dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Priority:</label>
          <select
            value={task.priority}
            onChange={handlePriorityChange}
            disabled={updating}
            className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {updating && <Loader2 className="animate-spin w-4 h-4 text-blue-500" />}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
