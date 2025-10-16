import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import TaskCard from "../../components/TaskCard";
import { useAuth } from "../../hooks/useAuth";

const priorityColors = {
  high: "from-red-100 via-red-50 to-white border-red-200",
  medium: "from-yellow-100 via-yellow-50 to-white border-yellow-200",
  low: "from-green-100 via-green-50 to-white border-green-200",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/tasks?page=${page}&limit=6`);
      const newTasks = res.data.tasks;
      setTasks(reset ? newTasks : [...tasks, ...newTasks]);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTasks(true);
  }, [user]);

  useEffect(() => {
    if (page > 1) fetchTasks();
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  // group by priority
  const priorities = ["high", "medium", "low"];
  const groupedTasks = priorities.reduce((acc, p) => {
    acc[p] = tasks.filter((t) => t.priority === p);
    return acc;
  }, {});

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {user?.role === "admin" ? "All Tasks" : "My Tasks"}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {priorities.map((priority) => (
          <div
            key={priority}
            className={`rounded-2xl bg-gradient-to-br ${priorityColors[priority]} p-4 shadow-sm border transition-all hover:shadow-md`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold capitalize ${priority === "high"
                    ? "text-red-700"
                    : priority === "medium"
                      ? "text-yellow-700"
                      : "text-green-700"
                  }`}
              >
                {priority} Priority
              </h2>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${priority === "high"
                    ? "bg-red-200 text-red-800"
                    : priority === "medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
              >
                {groupedTasks[priority].length} tasks
              </span>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {groupedTasks[priority].length ? (
                groupedTasks[priority].map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    refresh={() => fetchTasks(true)}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-sm italic bg-white/70 border rounded-lg p-3 text-center">
                  No tasks found
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {page < totalPages && (
        <div className="text-center mt-10">
          <button
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow-md disabled:opacity-60"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
