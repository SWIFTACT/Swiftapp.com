import React from 'react';
import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SetnewPassword = () => {
    return (
        <>
            <Navbar />
            <div className='w-full h-[55vh] flex flex-col justify-center items-center'>
                <h1 className='font-[700] my-2 text-[22px]'>Set new Password </h1>
                <p className='text-[13px] font-[500]'>Enter field below to set new password</p>
                <br />
                <div className='w-[70%] '>
                    <div>
                        <p className='text-[12px] font-[500]'>Password</p>
                        <input type="email" className='p-2 border text-[12px] w-full' placeholder='Enter new Password' />
                    </div>
                    <br />
                    <div>
                        <p className='text-[12px] font-[500]'> Confirm Password</p>
                        <input type="email" className='p-2 border text-[12px] w-full' placeholder='Confirm Password' />
                    </div>
                </div>
                <Link to= '/successful' className='bg-primary flex justify-center items-center rounded-[5px] text-white text-[12px] w-[70%] mt-8 py-3'>Reset Password</Link>
                <div className='flex mt-4 gap-2 justify-center items-center'>
                    <Link to='/forget-password/reset-passsword'>
                        <FaArrowLeft className='text-[12px]' />
                    </Link>
                    <p className='text-[12px]'>Back to login</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SetnewPassword;
