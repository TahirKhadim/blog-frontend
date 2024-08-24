import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [descriptionSections, setDescriptionSections] = useState([{ heading: '', paragraph: '' }]);
  const [writtenby, setWrittenby] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    // Validate that at least one section is present with valid content
    if (descriptionSections.length === 0 || !descriptionSections.some(section => section.heading.trim() || section.paragraph.trim())) {
      setError('At least one section with a heading or paragraph is required.');
      return;
    }
  
    // Concatenate the description sections into a single string
    const descriptionString = descriptionSections.map(section => {
      return `${section.heading.trim() ? `## ${section.heading.trim()}\n` : ''}${section.paragraph.trim()}`;
    }).join('\n\n');
  
    try {
      const token = localStorage.getItem('accesstoken'); // Retrieve token from local storage
  
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
  
      // Ensure values are strings before trimming
      const sanitizedTitle = (title || '').trim();
      const sanitizedWrittenby = (writtenby || '').trim();
  
      const formData = new FormData();
      formData.append('title', sanitizedTitle);
      formData.append('description', descriptionString); // Append as a single string
      formData.append('writtenby', sanitizedWrittenby);
      if (image) formData.append('image', image);
  
      const response = await axios.post('https://blog-api-two-rho.vercel.app/api/v1/posts/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setSuccess('Blog added successfully!');
      // Reset form fields
      setTitle('');
      setDescriptionSections([{ heading: '', paragraph: '' }]);
      setWrittenby('');
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add blog. Please try again.');
    }
  };
  
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddSection = () => {
    setDescriptionSections([...descriptionSections, { heading: '', paragraph: '' }]);
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...descriptionSections];
    newSections[index][field] = value;
    setDescriptionSections(newSections);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            {descriptionSections.map((section, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Heading"
                  value={section.heading}
                  onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Paragraph"
                  value={section.paragraph}
                  onChange={(e) => handleSectionChange(index, 'paragraph', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSection}
              className="text-blue-500 hover:underline"
            >
              + Add More
            </button>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="writtenby">
              Written By
            </label>
            <input
              type="text"
              id="writtenby"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={writtenby}
              onChange={(e) => setWrittenby(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleImageChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
