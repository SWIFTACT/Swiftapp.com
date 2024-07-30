import React from 'react';
import Navbar from '../../component/Navbar';
import { Link } from 'react-router-dom';
import done from '../../assets/done.png'
import Footer from '../../component/Footer';

const SuccessfulPasswordReset = () => {
    return (
        <div>
            <Navbar />
            <div  className='flex gap-4 mt-20 flex-col justify-center items-center'>
                <img src= {done} className='w-[20%]' alt="" />
                <p>Password Succesfully reset</p>
                <Link to={'/'} className='p-3 bg-black w-[30%] text-white text-[12px] flex  items-center justify-center'>Done</Link>
            </div>
            <Footer />
        </div>
    );
}

export default SuccessfulPasswordReset;
