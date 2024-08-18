import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        username,
        password,
      });

      

      if (response.data.success) {
        const { accesstoken, refreshtoken, user } = response.data; // Extract user data

        // Save tokens to local storage
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('refreshtoken', refreshtoken);

        // Dispatch login action with user data
        dispatch(authActions.login({ user }));

        // Redirect to the homepage or dashboard
        navigate('/blog'); // Adjust the path as necessary
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen'>
      <div className='bg-slate-900 border-slate-400 rounded-lg p-8 shadow-2xl backdrop-filter backdrop-blur-lg bg-opacity-40'>
        <form onSubmit={handleLogin} className='space-y-6'>
          <h1 className='text-5xl font-extrabold text-center text-white mb-8'>Login</h1>

          {error && <p className='text-red-500 text-center'>{error}</p>}

          <div className='relative'>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' 
              placeholder=" " 
              required 
            />
            <label className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Username
            </label>
          </div>

          <div className='relative'>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full py-3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' 
              placeholder=" " 
              required 
            />
            <label className='absolute left-0 top-3 text-white duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Password
            </label>
          </div>

          <div className='flex justify-between items-center text-gray-300'>
            <div className='flex items-center'>
              <input type="checkbox" id="remember" className='mr-2' />
              <label htmlFor="remember" className='cursor-pointer'>Remember me</label>
            </div>
            <span className='text-sm text-blue-400 cursor-pointer hover:underline'>Forgot Password?</span>
          </div>

          <button type='submit' className='w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>
            Login
          </button>

          <div className='text-center text-gray-300 mt-4'>
            <span>New here? <a href='/register' className='text-blue-400 hover:underline'>Register Here!</a></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
