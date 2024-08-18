import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
  const { postId } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        // console.log(postId);
        
        const response = await axios.get(`http://localhost:8000/api/v1/posts/posts/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data.data); 
        console.log((blog));
        // Adjust based on how the response is structured
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(error.response ? error.response.data.message : 'Error fetching blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accesstoken');
      await axios.put(`http://localhost:8000/api/v1/posts/posts/${postId}`, blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/user-blog'); // Redirect to user blogs after successful update
    } catch (error) {
      console.error('Error updating blog:', error);
      setError(error.response ? error.response.data.message : 'Error updating blog');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
            
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={blog?.title || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={blog?.description || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Updated By</label>
          <input
            type="text"
            name="writtenby"
            value={blog?.writtenby || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <img src={blog.image} alt="" />
          <input
            type="file"
            name="image"
            
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
