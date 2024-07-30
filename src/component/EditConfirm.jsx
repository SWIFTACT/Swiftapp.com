import React from 'react';
import { Link } from 'react-router-dom';

const EditConfirm = ({ handleSubmitClick }) => {
  return (
    <div className='confirm-popup'>
      <p>Are you sure you want to save changes?</p>
      <div className='flex w-full justify-between mt-4'>
        <Link 
          to={'/profile/edit-profile'} 
          className='border flex justify-center items-center border-primary py-2 px-8'
          onClick={handleSubmitClick}
        >
          No
        </Link>
        <Link 
          className='border flex justify-center items-center py-2 px-8 bg-primary text-white'
          onClick={handleSubmitClick}
          to={'/profile'}
        >
          Yes
        </Link>
      </div>
    </div>
  );
}

export default EditConfirm;
