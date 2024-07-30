import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OTPInput from '../../component/OTPInput';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

const PasswordReset = ({ handleToggleOpenLogin }) => {
    const handleOtpComplete = (otp) => {
        console.log('OTP entered:', otp);
        // Handle OTP submission logic here
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-[55vh] flex flex-col justify-center items-center'>
                <h1 className='font-[700] my-2 text-[22px]'>Password Reset</h1>
                <p className='text-[13px] font-[500]'>Enter code sent to your email</p>
                <br />
                <OTPInput length={4} onComplete={handleOtpComplete} />
                <Link to= '/set-new-password' className='bg-primary text-white text-[12px] w-[70%] mt-8 py-3'>Continue</Link>
                <div className='flex mt-4 gap-2 justify-center items-center'>
                    <Link to='/login'>
                        <FaArrowLeft className='text-[12px]' onClick={handleToggleOpenLogin} />
                    </Link>
                    <p className='text-[12px]'>Back to login</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PasswordReset;
