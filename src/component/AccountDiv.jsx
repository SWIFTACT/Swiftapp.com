import React from 'react';
import { Link } from 'react-router-dom';

const AccountDiv = () => {

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  };

  return (
    <>
      <div className='flex flex-col gap-2 link'>
        <Link to="/profile" className='text'>Profile</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/order-history">Order History</Link>
        <Link to="/profile/payment-methods">Payment Methods</Link>
        <Link to="/profile/account-settings">Account Settings</Link>
      </div>
      <Link to={'/profile/logout'} className='text-primary'>Logout</Link>
    </>
  );
}

export default AccountDiv;
