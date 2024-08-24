import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../store';
import axios from 'axios';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        
        const response = await axios.get('https://blog-api-two-rho.vercel.app/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data); 
        // console.log(response.data.data); // Log the data directly
        // Log the postId for debugging
        
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(error.response ? error.response.data.message : 'Error fetching blog');
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchUser();
    }
    
  }, [isLoggedIn]);

  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              MyApp
            </Link>
          </div>

          {/* Desktop Menu */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-lg hover:text-blue-400 transition duration-300">
                Home
              </Link>
              <Link to="/user-blog" className="text-lg hover:text-blue-400 transition duration-300">
                My Blogs
              </Link>
              <Link to="/add" className="text-lg hover:text-blue-400 transition duration-300">
                Create New
              </Link>
              <Link to="/blog" className="text-lg hover:text-blue-400 transition duration-300">
                All Blogs
              </Link>
            </div>
          )}

          {/* Authentication Links */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
            {isLoggedIn && user && (
              <div className="relative">
                <img
                  src={user.avatar} // Use the actual path from user data
                  alt="Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={() => setDropdownOpen(false)}
                />
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      to="/change-password"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Change Password
                    </Link>
                    <Link
                      to="/change-avatar"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Change Avatar
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  to="/user-blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  My Blogs
                </Link>
                <Link
                  to="/add"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  Create New
                </Link>
                <Link
                  to="/blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  All Blogs
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition duration-300"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
