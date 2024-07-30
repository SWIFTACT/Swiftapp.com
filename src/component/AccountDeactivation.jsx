import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import PrivacyDisplay from './PrivacyDisplay';
import { Link } from 'react-router-dom';

const AccountDeactivation = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // This will navigate to the previous URL
  };

  return (
    <div className="relative">
      <div className="blur-background">
        <Navbar />
        <PrivacyDisplay />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <FaTimes
            onClick={handleClose}
            className="cursor-pointer text-black float-right"
          />
          <div className="mt-10 flex flex-col ">
            <p className='font-[700] mb-5'>Account deactivation request</p>
            <p className="text-gray-700 text-[12px]">
              Upon account deactivation, please tell us the reason for closing your Foodhub account. This information will help to improve us and make us serve better. <span className='opacity-60'>(optional)</span>
            </p>
            <input type="text" className='border border-[2px] p-3 mt-3'/>
            <Link
             to={'/'}
              className="mt-8 w-fit bg-red-500 text-white text-[12px] py-2 px-4 rounded-[2px] hover:bg-red-600"
            >
              Delete My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeactivation;
