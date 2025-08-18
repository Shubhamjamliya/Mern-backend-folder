import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SinglePost from './pages/SinglePost';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/post/:id/edit" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}
