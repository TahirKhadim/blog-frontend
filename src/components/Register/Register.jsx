import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverimage, setCoverimage] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);
    if (coverimage) formData.append('coverimage', coverimage);

    try {
      await axios.post('https://blog-api-two-rho.vercel.app/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Registration successful!');
      setError('');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code outside the range of 2xx
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setError('No response from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError('Registration failed. Please try again.');
      }
      setMessage('');
    }
  };

  return (
    <div className='flex justify-center items-center h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='bg-slate-900 border-slate-400 rounded-lg p-8 shadow-2xl backdrop-filter backdrop-blur-lg bg-opacity-40'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <h1 className='text-5xl font-extrabold text-center text-white mb-8'>Register</h1>


          {message && <p className='text-green-500 text-center'>{message}</p>}
          {error && <p className='text-red-500 text-center'>{error}</p>}


          <div className='relative'>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=" "
              required
            />
            <label htmlFor="username" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Username</label>
          </div>

          <div className='relative'>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=" "
              required
            />
            <label htmlFor="fullname" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Fullname</label>
          </div>

          <div className='relative'>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=" "
              required
            />
            <label htmlFor="email" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Email</label>
          </div>

          <div className='relative'>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              required
            />
            <label htmlFor="avatar" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Avatar</label>
          </div>

          <div className='relative'>
            <input
              type="file"
              id="coverimage"
              name="coverimage"
              onChange={(e) => setCoverimage(e.target.files[0])}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              required
            />
            <label htmlFor="coverImage" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Cover Image</label>
          </div>

          <div className='relative'>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=" "
              required
            />
            <label htmlFor="password" className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
          </div>

          <div className='flex justify-between items-center text-gray-300'>
            <div className='flex items-center'>
              <input type="checkbox" id="remember" className='mr-2' />
              <label htmlFor="remember" className='cursor-pointer'>Remember me</label>
            </div>
            <span className='text-sm text-blue-400 cursor-pointer hover:underline'>Forgot Password?</span>
          </div>

          <button type='submit' className='w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>
            Register
          </button>

          <div className='text-center text-gray-300 mt-4'>
            <span>Already Registered? <Link to={'/login'} className='text-blue-400 hover:underline'>Login Here!</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
