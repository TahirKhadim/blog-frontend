import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserBlog = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await axios.get('https://blog-api-two-rho.vercel.app/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.data._id); 
        
        // Extract user ID from response
      } catch (err) {
        console.error('Error fetching user ID:', err);
        setError(err.response ? err.response.data.message : 'Error fetching user ID');
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  // Fetch user's blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!userId) return; // Ensure userId is available

      try {
        const token = localStorage.getItem('accesstoken');
        const response = await axios.get(`https://blog-api-two-rho.vercel.app/api/v1/posts/posts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data.data);
        console.log(blogs);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userId]); // Only run this effect when userId is available

  // Handle blog deletion
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('accesstoken');
      await axios.delete(`http://localhost:8000/api/v1/posts/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the blogs list after deletion
      setBlogs(blogs.filter((blog) => blog._id !== postId));
      
      
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError(error.response ? error.response.data.message : 'Error deleting blog');
    }
  };

  // Handle blog update
  const handleUpdate = (postId) => {
    // Navigate to the UpdateBlog component
    navigate(`/update-blog/${postId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {blogs.map((blog) => (

<div key={blog._id} className="bg-white rounded-lg shadow-md p-6 mb-6">

<Link to={`/blog/${blog._id}`}>
<div className="flex justify-center mb-4">
  <img
    src={blog.image}
    alt="Blog"
    className="w-full h-64 object-cover rounded-lg shadow-lg"
  />
</div>
<h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{blog.title}</h2>

       
       </Link>

<p className="text-sm font-bold text-gray-500 mb-4">Written by: {blog.writtenby}</p>

<div className="flex justify-between">
  <button 
    onClick={(e) => {
      e.stopPropagation(); // Prevent triggering the Link's onClick
      handleDelete(blog._id);
    }} 
    className="inline-block px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300"
  >
    Delete
  </button>
  <button 
    onClick={() => handleUpdate(blog._id)} 
    className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ml-2"
  >
    Update
  </button>
  <p><b>Total likes</b> {blog.likesCount}</p>
</div>
</div>
       
      ))}
    </div>
  );
};

export default UserBlog;
