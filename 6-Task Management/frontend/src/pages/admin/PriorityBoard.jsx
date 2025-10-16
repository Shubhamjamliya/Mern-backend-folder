import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Include 'completed' as a column
const columns = ["high", "medium", "low", "completed"];
const columnColors = {
  high: "bg-red-100",
  medium: "bg-yellow-100",
  low: "bg-green-100",
  completed: "bg-gray-200",
};

const PriorityBoard = () => {
  const [tasks, setTasks] = useState({
    high: [],
    medium: [],
    low: [],
    completed: [],
  });

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      const grouped = { high: [], medium: [], low: [], completed: [] };
      res.data.tasks.forEach((task) => {
        if (task.status === "completed") grouped.completed.push(task);
        else grouped[task.priority].push(task);
      });
      setTasks(grouped);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const task = tasks[source.droppableId][source.index];

    // Remove from source
    const newSourceTasks = Array.from(tasks[source.droppableId]);
    newSourceTasks.splice(source.index, 1);

    // Add to destination
    const newDestTasks = Array.from(tasks[destination.droppableId]);
    newDestTasks.splice(destination.index, task);

    const newTasks = {
      ...tasks,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestTasks,
    };
    setTasks(newTasks);

    // Determine new task properties
    let updatedTask = { ...task };
    if (destination.droppableId === "completed") {
      updatedTask.status = "completed";
    } else {
      updatedTask.status = "pending";
      updatedTask.priority = destination.droppableId;
    }

    // Update backend
    try {
      await axiosInstance.put(`/tasks/${draggableId}`, updatedTask);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
      fetchTasks(); // revert on error
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {columns.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex-1 p-4 rounded shadow min-h-[400px] ${columnColors[col]}`}
              >
                <h2 className="font-bold capitalize mb-2">
                  {col === "completed" ? "Completed" : `${col} priority`}
                </h2>
                {tasks[col].map((task, index) => (
                  <Draggable draggableId={task._id} index={index} key={task._id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 mb-2 rounded shadow cursor-move"
                      >
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        {task.assignedTo && (
                          <p className="text-xs text-gray-500">
                            Assigned to: {task.assignedTo.name}
                          </p>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default PriorityBoard;
