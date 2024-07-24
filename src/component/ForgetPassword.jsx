import React from 'react';

const ForgetPassword = ({ setIsLoginVisible }) => {
  const handleBackToLogin = () => {
    setIsLoginVisible(true);
  };

  return (
    <div className='fixed scale inset-0 z-40 flex items-center justify-center h-[90%]'>
      <div className='relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-center block mb-6 font-medium'>Forget Password</h2>
        <div className='form'>
          <input
            type="email"
            placeholder='Enter your email'
            required
            autoComplete='true'
            className='w-full p-4 my-4 border border-gray-300 rounded'
          />
          <button
            type="button"
            className='w-full p-2 my-4 bg-primary text-white rounded'
          >
            Submit
          </button>
        </div>
        <p className='text-center text-sm'>
          Remembered your password? <span onClick={handleBackToLogin} className='text-primary cursor-pointer'>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
