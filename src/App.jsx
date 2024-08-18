import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Blog from './components/Blog/Blog';
import AddBlog from './components/AddBlog/AddBlog';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserBlog from './components/UserBlog/UserBlog';
import UpdateBlog from './components/UpdateBlog/UpdateBlog';
import BlogDetail from './components/BlogDetail/BlogDetail';
import ChangePassword from './components/ChangePassword/ChangePassword';
import Profile from './components/profile/Profile';
import Avatar from './components/avatar/Avatar';
import EditProfileInfo from './components/EditProfileInfo/EditProfileInfo';

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog' element={<ProtectedRoute element={<Blog />} />} />
        <Route path='/blog/:postId' element={<ProtectedRoute element={<BlogDetail />} />} />
        <Route path='/add' element={<ProtectedRoute element={<AddBlog />} />} />
        <Route path='/user-blog' element={<ProtectedRoute element={<UserBlog />} />} />
        <Route path='/change-password' element={<ProtectedRoute element={<ChangePassword />} />} />
        <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
        <Route path='/change-avatar' element={<ProtectedRoute element={<Avatar />} />} />
        <Route path='/edit-info' element={<ProtectedRoute element={<EditProfileInfo />} />} />
        <Route path='/update-blog/:postId' element={<ProtectedRoute element={<UpdateBlog />} />} />
      </Routes>
    </div>
  );
};

export default App;
