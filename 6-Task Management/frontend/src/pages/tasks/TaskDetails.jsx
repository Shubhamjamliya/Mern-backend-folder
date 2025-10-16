import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get(`/tasks/${id}`);
      setTask(res.data.task);
    } catch (err) {
      toast.error("Failed to fetch task details");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axiosInstance.delete(`/tasks/${id}`);
        toast.success("Task deleted successfully!");
        navigate("/");
      } catch (err) {
        toast.error("Failed to delete task");
      }
    }
  };

  if (!task)
    return <p className="text-center text-gray-500 mt-10">Loading task details...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>

      <p className="text-gray-700 mb-4">{task.description}</p>

      <div className="mb-4 space-y-2">
        <p>
          <span className="font-semibold">Due Date:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Priority:</span>{" "}
          <span
            className={`${task.priority === "high"
              ? "text-red-600"
              : task.priority === "medium"
                ? "text-yellow-600"
                : "text-green-600"
              } font-semibold`}
          >
            {task.priority}
          </span>
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`${task.status === "completed" ? "text-green-700" : "text-blue-700"
              } font-semibold`}
          >
            {task.status}
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          to={`/edit-task/${task._id}`}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <Link
          to="/"
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default TaskDetails;
