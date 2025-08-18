import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../utils/axiosConfig';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/${id}`);
        setPost(res.data);

        // Check if the logged-in user is the owner of this post
        const tokenUserId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
        if (res.data.user._id === tokenUserId) setIsOwner(true);
      } catch (err) {
        console.error(err);
        alert('Post not found');
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/post/${id}`);
        navigate('/');
      } catch (err) {
        alert(err.response.data.message || 'Delete failed');
      }
    }
  };

  if (!post) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">By {post.user.name}</p>
      <p className="mb-6 whitespace-pre-wrap">{post.content}</p>

      {isOwner && (
        <div className="space-x-4">
          <Link
            to={`/post/${post._id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={deletePost}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
