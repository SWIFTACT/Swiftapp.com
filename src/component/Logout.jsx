import React from 'react';
import Navbar from './Navbar';
import Intro from './Intro';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the auth-token from local storage
    localStorage.removeItem('auth-token');
    // Navigate to the home page or login page after logout
    navigate('/');
  };

  return (
    <div className="relative">
      <div className="blur-background">
        <Navbar />
        <Intro />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <FaTimes
            className="cursor-pointer text-black float-right"
            onClick={() => navigate(-1)} // Go back to the previous page
          />
          <div className="mt-10 flex flex-col">
            <p className='font-[700] flex justify-center mb-5'>Are you sure you want to Logout?</p>
            <div className='flex justify-evenly'>
              <Link
                to={'/'}
                className="mt-8 w-fit text-black border border-primary text-[12px] py-2 px-4 rounded-[2px] hover:bg-red-600"
              >
                No
              </Link>
              <button
                onClick={handleLogout}
                className="mt-8 w-fit bg-red-500 text-white text-[12px] py-2 px-4 rounded-[2px] hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
