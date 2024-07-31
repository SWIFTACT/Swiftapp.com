import React from 'react';
import CartIcon from '../assets/cart.png';
import { Link } from 'react-router-dom';
import { useCart } from '../contest/CartContext';
// import { useCart } from '../context/CartContext'; // Adjust the import based on your file structure

const Cart = () => {
  const { cartCount } = useCart(); // Destructure cartCount from useCart

  return (
    <Link to={'/mycart'}>
      <div className='relative cursor-pointer'>
        <img src={CartIcon} alt="" className='w-6' />
        <p className='absolute flex justify-center items-center top-[-5px] right-[-5px] text-[8px] px-[4px] text-white rounded-[50%] h-fit bg-primary'>{cartCount}</p>
      </div>
    </Link>
  );
};

export default Cart;
