import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    avatar: '',
    coverimage: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          username: response.data.data.username,
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          avatar: response.data.data.avatar,
          coverimage: response.data.data.coverimage,
        });
        setSuccess('Data loaded successfully');
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle file input change for avatar and cover image
  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleUpdate(selectedFile, type);
    }
  };

  // Handle avatar or cover image update
  const handleUpdate = async (file, type) => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append(type, file); // 'avatar' or 'coverimage' must match the Multer configuration

      const token = localStorage.getItem('accesstoken');
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/${type === 'avatar' ? 'avatar' : 'cover-image'}`, // Correct endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Server response:', response.data);
      setSuccess(`${type === 'avatar' ? 'Avatar' : 'Cover image'} updated successfully!`);
      setUser((prevUser) => ({ ...prevUser, [type]: response.data.data[type] }));
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      setError(error.response ? error.response.data.message : `Error updating ${type}`);
    }
  };

  // Trigger file input manually
  const triggerFileInput = (type) => {
    document.getElementById(type).click();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={user.coverimage}
            alt="Cover"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div
            onClick={() => triggerFileInput('coverimage')}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <FaEdit />
          </div>
          <input
            type="file"
            id="coverimage"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'coverimage')}
            accept="image/*"
          />
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                src={user.avatar}
                alt="Avatar"
              />
              <div
                onClick={() => triggerFileInput('avatar')}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              >
                <FaEdit />
              </div>
              <input
                type="file"
                id="avatar"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, 'avatar')}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div className="p-6 mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-900">
            {user.fullname}'s Profile
          </h2>
          <table className="table-auto w-full">
            <tbody>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 font-semibold">Username:</td>
                <td className="px-4 py-2">{user.username}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">Full Name:</td>
                <td className="px-4 py-2">{user.fullname}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 font-semibold">Email:</td>
                <td className="px-4 py-2">{user.email}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/edit-info')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
