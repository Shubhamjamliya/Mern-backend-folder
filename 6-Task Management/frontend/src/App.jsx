import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TaskForm from "./pages/tasks/TaskForm";
import TaskDetails from "./pages/tasks/TaskDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AdminLayout from "./layouts/AdminLayout";
import AddUser from "./pages/admin/AddUser";
import AllTasks from "./pages/admin/AllTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllUsers from "./pages/admin/AllUsers";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Task Pages */}
        <Route
          path="/add-task"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <TaskForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <TaskForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TaskDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes with Sidebar */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="add-task" element={<TaskForm />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="all-tasks" element={<AllTasks />} />
          <Route path="all-users" element={<AllUsers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
