import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-black mt-20 py-20 w-full'>
            <div className=' lg:flex flex flex-col justify-center  items-center gap-[6rem] '>
                <div className='footer-box '>
                    <h5>Information</h5>
                    <ul>
                        <li><Link>About Us</Link></li>
                        <li><Link> Refund and Return Policy</Link></li>
                        <li><Link>Privacy Policy</Link></li>
                        <li><Link>Terms and Condition</Link></li>
                    </ul>
                </div>
                <div className='footer-box'>
                    <h5>Customer Service</h5>
                    <ul>
                        <li><Link>Contact</Link></li>

                    </ul>
                </div>
                <div className='footer-box'>
                    <h5>My Account</h5>
                    <ul>
                        <li><Link>My Account</Link></li>
                        <li><Link>Order Histrory</Link></li>
                        <li><Link>Newsletter</Link></li>
                        <li><Link></Link></li>
                    </ul>
                </div>
                <div className='footer-box'>
                    <h5>Social Media</h5>
                    <ul>
                        <li><Link>X</Link></li>
                        <li><Link>Instagram</Link></li>
                        <li><Link>Facebook</Link></li>
                    </ul>
                </div>
            </div>
            <hr className='w-[100%] mt-16' />
            <p className='text-white flex justify-center items-center mt-14'>Copyright 2024 Swift All right reserved. </p>
        </div>
    )
}

export default Footer