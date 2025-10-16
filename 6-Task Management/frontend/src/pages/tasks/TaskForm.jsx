import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // task id if editing
  const isEdit = Boolean(id);

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
    assignedTo: "",
  });

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch all users (for admin assignment)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data || []); // <-- use res.data directly
        setLoadingUsers(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch task if editing
  useEffect(() => {
    if (isEdit) {
      const fetchTask = async () => {
        try {
          const res = await axiosInstance.get(`/tasks/${id}`);
          setTask(res.data?.task || {});
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch task data");
        }
      };
      fetchTask();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axiosInstance.put(`/tasks/${id}`, task);
        toast.success("Task updated successfully!");
      } else {
        await axiosInstance.post("/tasks", task);
        toast.success("Task created successfully!");
      }
      navigate("/admin/all-tasks"); // navigate to all tasks after submit
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Task" : "Create New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task Title */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full border rounded p-2"
          value={task.title || ""}
          onChange={handleChange}
          required
        />

        {/* Task Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          className="w-full border rounded p-2 h-28"
          value={task.description || ""}
          onChange={handleChange}
          required
        />

        {/* Due Date & Priority */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="w-full border rounded p-2"
              value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">Priority</label>
            <select
              name="priority"
              className="w-full border rounded p-2"
              value={task.priority || "medium"}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            className="w-full border rounded p-2"
            value={task.status || "pending"}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Assign User */}
        <div>
          <label className="block text-sm mb-1">Assign To</label>
          <select
            name="assignedTo"
            className="w-full border rounded p-2"
            value={task.assignedTo || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {loadingUsers ? (
              <option disabled>Loading users...</option>
            ) : (
              users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))
            )}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          {isEdit ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
