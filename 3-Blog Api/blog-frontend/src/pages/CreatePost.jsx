import { useState } from 'react';
import API from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/post', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="content" placeholder="Content" onChange={handleChange} className="border p-2 w-full"></textarea>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Create</button>
    </form>
  );
}
