import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import like icons


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set()); // To track liked posts

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('accesstoken'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:8000/api/v1/posts/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Include the number of likes in each blog object if available
        const blogsWithLikes = response.data.data.map(blog => ({
          ...blog,
          likesCount: blog.likesCount || 0 // Use likesCount from response
        }));
        setBlogs(blogsWithLikes);

        // Fetch liked posts by the user
        const likedResponse = await axios.get('http://localhost:8000/api/v1/posts/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLikedPosts(new Set(likedResponse.data.data.map(like => like.postId))); // Use postId from response

        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.post(`http://localhost:8000/api/v1/like/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update the likedPosts set based on the response
      setLikedPosts(prev => {
        const newLikedPosts = new Set(prev);
        if (newLikedPosts.has(postId)) {
          newLikedPosts.delete(postId); // Un-like the post
        } else {
          newLikedPosts.add(postId); // Like the post
        }
        return newLikedPosts;
      });
  
      // Update the likes count for the specific post
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === postId
            ? { ...blog, likesCount: response.data.data.likesCount }
            : blog
        )
      );
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center mb-4">
            <img
              src={blog.image}
              alt="Blog"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-4">Written by: {blog.writtenby}</p>

          {/* Like Button */}
          <div className='flex justify-between items-center'>
            <Link
              to={`/blog/${blog._id}`}
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Read More
            </Link>
            <button
              onClick={() => handleLike(blog._id)}
              className="flex items-center text-red-500 hover:text-red-600 transition duration-300"
            >
              {likedPosts.has(blog._id) ? (
                <div className='flex items-center'>

                <FaHeart size={24} />
                 <span className="ml-2">Liked</span>
                 
                </div>
              ) : (
                <div className='flex items-center'>
                   <FaRegHeart size={24} />
                   <span className="ml-2">Like</span>
                </div>
              )}
              <span className="ml-2">{blog.likesCount}</span> {/* Display number of likes */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
