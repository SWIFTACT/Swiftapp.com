import React, { useState } from 'react';
import CartIcon from '../assets/cart.png'
import { Link } from 'react-router-dom';

const Cart = () => {

    const [incrementCart, setIncrementCart] = useState(0)
    return (
        <Link  to={'/mycart'}>
            <div className='relative cursor-pointer'>
                <img src={CartIcon} alt="" className='w-6' />
                <p className='absolute flex justify-center items-center top-[-5px] right-[-5px] text-[8px] px-[4px] text-white rounded-[50%] h-fit bg-primary'>{incrementCart}</p>
            </div>
        </Link>
    );
}

export default Cart;
