import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/axiosConfig';

export default function EditPost() {
  const { id } = useParams();          // post id from the route
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  // Load existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/${id}`);

        setForm({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error(err);
        alert('Could not load post data');
      }
    };
    fetchPost();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/post/${id}`, form);
      navigate(`/`);  // go back to the homepage post page
    } catch (err) {
      alert(err.response.data.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="5"
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
