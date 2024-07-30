import React, { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import AccountDeactivation from './AccountDeactivation';
import { Link } from 'react-router-dom';

const DeleteAccount = ({ handleClickDeleteAccount }) => {
  const accountDeactivateref = useRef()

  const handleaccountDeactivateref = () => {
    accountDeactivateref.current.classList.toggle('account-deactivation-responsive')
  }

  return (
    <div className="  flex items-center justify-center  z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <FaTimes
          onClick={handleClickDeleteAccount}
          className="cursor-pointer text-black float-right"
        />
        <div className="mt-10 flex flex-col gap-[2rem]">
          <p className="text-gray-700  ">
            Please note that this action is irreversible and all the data associated with your account will be permanently deleted.
          </p>
          <Link
            to={'/profile/account-delete'}
            onClick={handleClickDeleteAccount}
            className="mt-1 w-fit bg-red-500 text-white text-[12px] py-2 px-4 rounded-[2px] hover:bg-red-600"
          >
            Proceed to delete Account
          </Link>
        </div>
      </div>


    </div>
  );
}

export default DeleteAccount;
