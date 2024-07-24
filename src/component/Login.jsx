import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.png';
import apple from '../assets/apple.png';
import { FaTimes } from 'react-icons/fa';

const Login = ({ handleToggleOpenLogin }) => {
  const [state, setState] = useState('Login');
  const navigate = useNavigate();
  const loginRef = useRef();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    // Add your signup logic here
  };

  const handleLogin = async () => {
    // Add your login logic here
  };

  return (
    <>
    <div ref={loginRef} className='fixed  inset-0 z-40 flex items-center justify-center'>
      <FaTimes className='font-[600] text-[22px] text-white  absolute top-10 right-10 m-4 cursor-pointer' onClick={handleToggleOpenLogin} />
      <div className='relative w-full scale max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <span className="text-center flex justify-center mb-6 font-[500]">{state}</span>
        <div className='form'>
          {state === "Sign up" &&
            <div className='flex gap-4'>
              <input
                type="text"
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Full Name'
                required
                autoComplete='true'
                className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
              />
              <input
                type="text"
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Last Name'
                required
                autoComplete='true'
                className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
              />
            </div>
          }
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
            autoComplete='true'
            className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
          />
          {state === 'Sign up' &&
            <input
              type="tel"
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Phone Number'
              required
              autoComplete='true'
              className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
            />
          }
          <div className='flex gap-4'>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
              autoComplete='true'
              className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
            />
            {state === 'Sign up' &&
              <input
                type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm Password'
                required
                autoComplete='true'
                className='w-full p-4 my-4 border border-gray-300 outline-none bg-transparent rounded'
              />
            }
          </div>

          {state === 'Login' &&
            <div className='flex w-full justify-between my-3'>
              <div className=''><input type="checkbox" /> Remember Me</div>
              <p className='text-primary'>Forget Password?</p>
            </div>
          }
          {state === 'Login' ?
            <button
              type="button"
              onClick={handleLogin}
              className='w-full p-2 my-4 bg-primary text-white rounded'
            >
              Login
            </button>
            :
            <button
              type="button"
              onClick={handleSignup}
              className='w-full p-2 mb-4 bg-primary text-white rounded'
            >
              Sign up
            </button>
          }
        </div>
        <div className='text-center flex justify-center font-[600]'>OR</div>
        <div className='mt-6'>
          <div className='cursor-pointer flex justify-center items-center border-[1px] border border-[#001A7266] my-2 rounded-[10px] h-14 gap-[0.2rem] mb-4'>
            <img src={google} alt="" className='w-12' />
            <p className='font-[600]'>Continue with Google</p>
          </div>
          <div className='cursor-pointer flex justify-center items-center border-[1px] border border-[#001A7266] my-2 rounded-[10px] h-14 gap-[0.2rem] mb-4'>
            <img src={apple} alt="" className='w-10' />
            <p className='font-[600]'>Continue with Apple</p>
          </div>
        </div>
        {state === "Login" ?
          <p className='text-center text-[12px] '>
            Don't have an account? <span onClick={() => setState("Sign up")} className='text-primary cursor-pointer'>Sign up</span>
          </p>
          :
          <p className='text-center text-[12px] '>
            Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer'>Login here</span>
          </p>
        }
      </div>
    </div>
    </>
  );
};

export default Login;
