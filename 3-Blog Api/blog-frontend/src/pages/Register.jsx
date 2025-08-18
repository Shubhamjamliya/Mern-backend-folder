import { useState } from 'react';
import API from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/register', form);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  );
}
