import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfileInfo = () => {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Update profile information
  const updateProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.patch('http://localhost:8000/api/v1/users/update-account', user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess('Profile updated successfully');
      // Optionally, you might want to refetch user data or update the state here
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-900">
            Edit Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <div className="text-center mt-6">
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                onClick={updateProfile}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileInfo;
