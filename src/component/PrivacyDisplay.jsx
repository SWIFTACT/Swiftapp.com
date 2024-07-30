import React, { useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

const PrivacyDisplay = () => {
  const deleteAccRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClickDeleteAccount = () => {
    deleteAccRef.current.classList.toggle('delete-account-ref');
    overlayRef.current.classList.toggle('overlay-active');
  };

  return (
    <div>
      <div className="p-6 h-[60vh]">
        <h2 className="font-[700]">Privacy & Security</h2>
        <div className="flex flex-col gap-6 mt-4 p-4">
          <Link to="/profile/privacy-security/change-password" className="cursor-pointer flex items-center justify-between">
            <p>Change Password</p>
            <FaChevronRight />
          </Link>
          <div onClick={handleClickDeleteAccount} className="flex items-center justify-between cursor-pointer">
            <p>Delete Account</p>
            <FaChevronRight />
          </div>

          <div ref={deleteAccRef} className="delete-account">
            <DeleteAccount handleClickDeleteAccount={handleClickDeleteAccount} />
          </div>
        </div>
      </div>
      <div ref={overlayRef} className="overlay"></div>
    </div>
  );
}

export default PrivacyDisplay;
