import React, { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditConfirm from './EditConfirm';

const EditProfileDisplay = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const updateProfile = useRef();
  const overlayRef = useRef();

  const handleSubmitClick = () => {
    updateProfile.current.classList.toggle('success-pop-up-profile-update-responsive');
    overlayRef.current.classList.toggle('overlay-active');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearField = (field) => {
    setFormData({ ...formData, [field]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="edit-profile-display">
      <div className="w-full ">
        <h3 className="text-[20px] p-4 bg-primary text-white font-semibold mb-6">Profile</h3>
        <form onSubmit={handleSubmit} className="gap-6 px-12 py-8 w-full flex flex-col justify-center ">
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold" htmlFor="firstName">First Name</label>
            <div className="relative w-full">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border w-full py-2 px-4 rounded"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {formData.firstName && (
                <FaTimes
                  className="absolute top-3 right-3 cursor-pointer text-red-500"
                  onClick={() => handleClearField('firstName')}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold" htmlFor="lastName">Last Name</label>
            <div className="relative w-full">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border w-full py-2 px-4 rounded"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {formData.lastName && (
                <FaTimes
                  className="absolute top-3 right-3 cursor-pointer text-red-500"
                  onClick={() => handleClearField('lastName')}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold" htmlFor="email">Email</label>
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                className="border w-full py-2 px-4 rounded"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formData.email && (
                <FaTimes
                  className="absolute top-3 right-3 cursor-pointer text-red-500"
                  onClick={() => handleClearField('email')}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold" htmlFor="phoneNumber">Phone Number</label>
            <div className="relative w-full">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="border w-full py-2 px-4 rounded"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {formData.phoneNumber && (
                <FaTimes
                  className="absolute top-3 right-3 cursor-pointer text-red-500"
                  onClick={() => handleClearField('phoneNumber')}
                />
              )}
            </div>
          </div>
          <Link onClick={handleSubmitClick} className='w-[100%] justify-center flex items-center' > 
            <button type="submit" className="bg-primary  w-full my-12 flex justify-center items-center py-4 text-white rounded">Update</button>
          </Link>

          <div ref={updateProfile} className='success-pop-up-profile-update'>
            <EditConfirm handleSubmitClick={handleSubmitClick} />
          </div>
        </form>
      </div>
      <div ref={overlayRef} className="overlay"></div>
    </div>
  );
}

export default EditProfileDisplay;
