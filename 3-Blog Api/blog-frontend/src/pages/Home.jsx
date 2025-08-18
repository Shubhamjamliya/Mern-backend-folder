import { useEffect, useState } from 'react';
import API from '../utils/axiosConfig';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/post/')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="p-6 space-y-4">
      {posts.map(post => (
        <div key={post._id} className="border p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
          <p className="text-sm text-gray-500">By {post.user?.name}</p>
          <Link to={`/post/${post._id}/edit`} className="text-blue-600">Edit</Link><br />
          <Link to={`/post/${post._id}`} className="text-blue-600">Read More</Link>
        </div>
      ))}
    </div>
  );
}
