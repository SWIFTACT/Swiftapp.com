import React, { useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountSettingsDisplay = () => {
    const addcardRef = useRef(null);
    const overlayRef = useRef(null);

    const handleClickAddCard = () => {
        if (overlayRef.current && addcardRef.current) {
            overlayRef.current.classList.toggle('overlay-active');
            addcardRef.current.classList.toggle('add-card-div-responsiveness');
        }
    };

    return (
        <div>
            <div className='p-4 h-[60vh]'>
                <h2 className='font-[700]'>Account Settings</h2>
                <div className='flex flex-col gap-6 mt-4 p-4'>
                    <Link to={'/profile/account-setting/notification'} className='flex items-center justify-between cursor-pointer'>
                        <p >Notifications</p>
                        <FaChevronRight />
                    </Link>
                    <Link to={'/profile/account-setting/privacy-security'} className='flex items-center justify-between cursor-pointer'>
                        <p >Privacy & Security</p>
                        <FaChevronRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AccountSettingsDisplay;
