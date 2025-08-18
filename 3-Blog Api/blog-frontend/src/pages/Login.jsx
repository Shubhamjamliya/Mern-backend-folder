import { useState } from 'react';
import API from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
