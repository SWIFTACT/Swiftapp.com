import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditProfileDisplay from '../../component/EditProfileDisplay';

const EditProfile = () => {

  return (
    <div>
      <Navbar />
      <EditProfileDisplay />
    </div>
  );
};

export default EditProfile;
