import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default
  });

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users", userData);
      toast.success("User added successfully!");
      setUserData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
