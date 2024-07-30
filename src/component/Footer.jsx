import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-black mt-20 p-5 w-full'>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[12px] justify-center items-start'>
                <div className='bg-[#434343] p-4 h-[200px] flex flex-col items-start justify-start rounded-[7px]'>
                    <h5 className='text-white text-[14px] font-[600]'>Information</h5>
                    <ul className='mt-2'>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>About Us</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Refund and Return Policy</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Privacy Policy</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Terms and Condition</Link></li>
                    </ul>
                </div>
                <div className='bg-[#434343] p-4 h-[200px] flex flex-col items-start justify-start rounded-[7px]'>
                    <h5 className='text-white text-[14px] font-[600]'>Customer Service</h5>
                    <ul className='mt-2'>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Contact</Link></li>
                    </ul>
                </div>
                <div className='bg-[#434343] p-4 h-[200px] flex flex-col items-start justify-start rounded-[7px]'>
                    <h5 className='text-white text-[14px] font-[600]'>My Account</h5>
                    <ul className='mt-2'>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>My Account</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Order History</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Newsletter</Link></li>
                    </ul>
                </div>
                <div className='bg-[#434343] p-4 h-[200px] flex flex-col items-start justify-start rounded-[7px]'>
                    <h5 className='text-white text-[14px] font-[600]'>Social Media</h5>
                    <ul className='mt-2'>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>X</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Instagram</Link></li>
                        <li><Link to="/" className='text-[#DED6D6] block mt-2 hover:opacity-80'>Facebook</Link></li>
                    </ul>
                </div>
            </div>
            <hr className='w-full mt-16 border-gray-600' />
            <p className='text-white text-center mt-14'>Copyright 2024 Swift All rights reserved.</p>
        </div>
    )
}

export default Footer;
