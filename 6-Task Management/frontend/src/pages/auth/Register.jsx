import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Side Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 text-white p-10 w-1/2">
          <h2 className="text-4xl font-bold mb-4">Join Us 🚀</h2>
          <p className="text-lg opacity-90 text-center">
            Create an account and start managing your tasks effortlessly!
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition-transform"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
