import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { postId } = useParams(); // Retrieve post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        
        const response = await axios.get(`http://localhost:8000/api/v1/posts/posts/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data.data); 
        console.log(response.data.data); // Log the data directly
        console.log(postId); // Log the postId for debugging
        
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(error.response ? error.response.data.message : 'Error fetching blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {post && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <img
            src={post.image}
            alt="Blog"
            className="w-full h-64 md:h-1/2 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="mb-4">
      <ReactMarkdown className="text-gray-600">
        {post.description}
      </ReactMarkdown>
    </div>
          <p className="text-gray-600 mb-4">Written by: <b><i>{post.writtenby}</i></b></p>
          <p className="text-gray-600 mb-4">posted on <b><i>{post.createdAt}</i></b></p>

          
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
