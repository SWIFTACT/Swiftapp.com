import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import FaTimes component
import google from '../assets/google.png';
import apple from '../assets/apple.png';

const SignUp = ({ handleToggleOpenLogin }) => {
    const [state, setState] = useState('Login');
    const loginRef = useRef();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '' // Added confirmPassword field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSignup = async () => {
        console.log('Sign up button clicked');
        try {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            const response = await fetch('https://swiftapp-com.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('auth-token', data.token);
                setState('Login'); // Change state to 'Login' after successful sign-up
                alert('Sign up successful. Please log in.');
            } else {
                alert(data.message || 'Sign up failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleLogin = async () => {
        console.log('Login button clicked');
        try {
            const response = await fetch('https://swiftapp-com.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('auth-token', data.token);
                alert('Login successful');
                setState('Logged in');
                window.location.reload();
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div ref={loginRef} className='fixed scale inset-0 z-40 flex items-center justify-center h-[90%]'>
            <FaTimes className='absolute -top-[40px] right-0 text-white text-2xl cursor-pointer' onClick={() => { console.log('Close button clicked'); handleToggleOpenLogin(); }} />
            <div className='relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
                <span className="text-center block mb-6 font-medium">{state}</span>
                <div className='form'>
                    {state === "Sign up" && (
                        <div className='flex gap-4'>
                            <input
                                type="text"
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='First Name'
                                required
                                autoComplete='true'
                                className='w-full p-4 my-4 border border-gray-300 rounded'
                            />
                            <input
                                type="text"
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Last Name'
                                required
                                autoComplete='true'
                                className='w-full p-4 my-4 border border-gray-300 rounded'
                            />
                        </div>
                    )}
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                        autoComplete='true'
                        className='w-full p-4 my-4 border border-gray-300 rounded'
                    />
                    {state === 'Sign up' && (
                        <input
                            type="tel"
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder='Phone Number'
                            required
                            autoComplete='true'
                            className='w-full p-4 my-4 border border-gray-300 rounded'
                        />
                    )}
                    <div className='flex gap-4'>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                            autoComplete='true'
                            className='w-full p-4 my-4 border border-gray-300 rounded'
                        />
                        {state === 'Sign up' && (
                            <input
                                type="password"
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                required
                                autoComplete='true'
                                className='w-full p-4 my-4 border border-gray-300 rounded'
                            />
                        )}
                    </div>

                    {state === 'Login' && (
                        <div className='flex w-full justify-between my-3'>
                            <div><input type="checkbox" /> Remember Me</div>
                            <Link to={'/forget-password'} className='text-primary cursor-pointer'>Forget Password?</Link>
                        </div>
                    )}
                    {state === 'Login' ? (
                        <button
                            type="button"
                            onClick={handleLogin}
                            className='w-full p-2 my-4 bg-primary text-white rounded'
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSignup}
                            className='w-full p-2 mb-4 bg-primary text-white rounded'
                        >
                            Sign up
                        </button>
                    )}
                </div>
                <div className='text-center font-semibold my-4'>OR</div>
                <div className='mt-6'>
                    <div className='cursor-pointer flex justify-center items-center border border-[#001A7266] my-2 rounded-lg h-14 gap-2 mb-4'>
                        <img src={google} alt="Google" className='w-12' />
                        <p className='font-semibold'>Continue with Google</p>
                    </div>
                    <div className='cursor-pointer flex justify-center items-center border border-[#001A7266] my-2 rounded-lg h-14 gap-2 mb-4'>
                        <img src={apple} alt="Apple" className='w-10' />
                        <p className='font-semibold'>Continue with Apple</p>
                    </div>
                </div>
                {state === "Login" ? (
                    <p className='text-center text-sm'>
                        Don't have an account? <span onClick={() => setState("Sign up")} className='text-primary cursor-pointer'>Sign up</span>
                    </p>
                ) : (
                    <p className='text-center text-sm'>
                        Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer'>Login here</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignUp;
