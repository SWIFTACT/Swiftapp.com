import React from 'react';
import Navbar from '../component/Navbar';
import CartDisplay from '../component/CartDisplay';

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <CartDisplay />
      </div>
    </div>
  );
}

export default CartPage;
