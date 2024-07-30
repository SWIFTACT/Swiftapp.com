import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../style';
// import Login from './Login';
import SignUp from './SignUp';
import Cart from './Cart';
import { FaCaretDown, FaChevronDown } from 'react-icons/fa';
import AccountDiv from './AccountDiv';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginRef = useRef();
  const myaccRef = useRef();
  const location = useLocation();

  const handleToggleOpenLogin = () => {
    loginRef.current.classList.toggle('login-div');
  };

  const handleToggleAccountOpen = () => {
    myaccRef.current.classList.toggle('acc-div');
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className={`flex justify-between items-center w-full ${styles.padding} bg-white relative`}>
      <div>
        <img src="" alt="" />
        <Link to={'/'} className='text-primary font-[700] text-[16px]'>SWIFT</Link>
      </div>
      {isAuthenticated ? (
        <div className='flex gap-3 items-center justify-center'>
          {!location.pathname.includes('/profile') && (
            <div onClick={handleToggleAccountOpen} className='flex gap-1 justify-center items-center cursor-pointer'>
              <p className={`text-primary font-[400] text-[14px] cursor-pointer`}>My Account</p>
              <FaChevronDown className='text-[13px] text-primary' />
            </div>
          )}
          <Cart />
          <div ref={myaccRef} onC className='acc-item'>
            <AccountDiv />
          </div>
        </div>
      ) : (
        <>
          <div className='flex gap-3'>
            <p onClick={handleToggleOpenLogin} className={`text-primary font-[500] text-[16px] cursor-pointer`}>Sign Up</p>
            <p onClick={handleToggleOpenLogin} className={`text-primary font-[500] text-[16px] cursor-pointer`}>Login</p>
          </div>
          <div ref={loginRef} className='at-item'>
            <SignUp handleToggleOpenLogin={handleToggleOpenLogin} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
