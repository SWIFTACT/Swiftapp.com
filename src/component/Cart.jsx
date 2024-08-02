import React, { useContext } from 'react';
import CartIcon from '../assets/cart.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Adjust import based on your file structure

const Cart = () => {
  const { getTotalCartItems } = useContext(ShopContext); // Use ShopContext

  return (
    <Link to={'/mycart'}>
      <div className='relative cursor-pointer'>
        <img src={CartIcon} alt="Cart" className='w-6' />
        <p className='absolute flex justify-center items-center top-[-5px] right-[-5px] text-[8px] px-[4px] text-white rounded-[50%] h-fit bg-primary'>
          {getTotalCartItems()}{/* Display cartCount */}
        </p>
      </div>
    </Link>
  );
};

export default Cart;
