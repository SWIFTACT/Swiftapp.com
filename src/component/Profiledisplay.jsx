import React, { useState, useEffect } from 'react';
import profilebg from '../assets/profilebg.png';
import { Link } from 'react-router-dom';

const Profiledisplay = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        // Fetch user data from endpoint
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='px-4 flex w-full justify-center items-center flex-col'>
            <h3 className='w-full items-center justify-center flex my-4 text-[18px] font-[600]'>Profile</h3>
            <img src={profilebg} alt="Profile Background" />
            <div className='px-6 self-start w-full'>
                <h3 className='my-6 font-[600]'>User Basic Info</h3>
                <div className='flex gap-6 flex-col '>
                    <div>
                        <p className='font-[600]'>Name</p>
                        <p className='border-b py-4'>{user.name}</p>
                    </div>
                    <div>
                        <p className='font-[600]'>Email</p>
                        <p className='border-b py-4'>{user.email}</p>
                    </div>
                    <div>
                        <p className='font-[600]'>Phone Number</p>
                        <p className='border-b py-4'>{user.phoneNumber}</p>
                    </div>
                </div>
                <Link to={'/profile/edit-profile'} className='bg-primary flex justify-center items-center w-full text-white my-20 py-5 text-[13px] font-[600] rounded-[5px]'>Edit Profile</Link>
            </div>
        </div>
    );
}

export default Profiledisplay;
