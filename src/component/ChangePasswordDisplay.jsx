import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ChangePasswordDisplay = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearField = (field) => {
    setFormData({ ...formData, [field]: '' });
  };

  const handleTogglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic
  };

  return (
    <div className="edit-profile-display">
      <div className="w-full ">
        <h3 className="text-[20px] p-4 bg-primary text-white font-semibold mb-6">Change Password</h3>
        <form onSubmit={handleSubmit} className="gap-6 px-12 py-8 w-full flex flex-col justify-center">
          <div className="flex flex-col items-start gap-2 rounded-[5px]">
            <label className="font-semibold" htmlFor="oldPassword">Old Password</label>
            <div className="relative w-full bg-[#F4EEEE] rounded-[5px]">
              <input
                type={showPassword.oldPassword ? 'text' : 'password'}
                id="oldPassword"
                name="oldPassword"
                className="border w-full py-2 px-4 rounded"
                value={formData.oldPassword}
                onChange={handleInputChange}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => handleTogglePassword('oldPassword')}
              >
                {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 rounded-[5px]">
            <label className="font-semibold" htmlFor="newPassword">New Password</label>
            <div className="relative w-full bg-[#F4EEEE] rounded-[5px]">
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                className="border w-full py-2 px-4 rounded"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => handleTogglePassword('newPassword')}
              >
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 rounded-[5px]">
            <label className="font-semibold" htmlFor="confirmPassword">Confirm New Password</label>
            <div className="relative w-full bg-[#F4EEEE] rounded-[5px]">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="border w-full py-2 px-4 rounded"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => handleTogglePassword('confirmPassword')}
              >
                {showPassword.confirmPassword ? <FaEyeSlash  className='opacity-[0.7]'/> : <FaEye />}
              </div>
            </div>
          </div>
          <button type="submit" className="bg-primary w-full my-12 flex justify-center items-center py-4 text-white rounded">Update</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordDisplay;
