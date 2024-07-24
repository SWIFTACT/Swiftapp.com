import React from 'react';
import Navbar from '../component/Navbar';
import { FaArrowLeft } from "react-icons/fa6";
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full h-[55vh] flex flex-col justify-center items-center'>
        <h1 className='font-[700] my-2 text-[22px]'>Forget Password ?</h1>
        <p className='text-[13px] font-[500]'> Enter email address for password reset</p>
        <br />
        <div className='w-[70%]'>
          <p className='text-[14px] font-[500]'>Email</p>
          <input type="email" className='p-2 border w-full' placeholder='Enter your email' />
        </div>
        <button className='bg-primary text-white text-[12px] w-[70%] mt-8 py-3'>Reset Password</button>
        <div className='flex mt-4 gap-2 justify-center items-center '><Link to={'/login'} ><FaArrowLeft className='text-[12px]' /></Link><p className='text-[12px]'>Back to login</p></div>
      </div>
      <Footer />
    </div>
  );
}
 
export default ForgetPassword;
