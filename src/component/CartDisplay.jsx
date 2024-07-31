import React, { useEffect, useState } from 'react';
import { useCart } from '../contest/CartContext'; // Adjust import based on file structure

// Utility function to retrieve cart data from local storage
const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

const CartDisplay = () => {
  const [cart, setCart] = useState([]);
  const { removeFromCart } = useCart(); // Access context

  useEffect(() => {
    // Retrieve cart data from local storage when component mounts
    setCart(getCart());
  }, []);

  const handleRemove = (itemId) => {
    // Remove item from cart and update state
    removeFromCart(itemId);
    setCart(getCart()); // Update local state to reflect changes
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.map((order, index) => (
        <div key={index} className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex items-center">
            <img
              src={order.image} // Display the image
              alt={order.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold">{order.name}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: N{order.totalPrice}</p>
              <div>
                <h4 className="text-lg font-semibold mt-2">Extras:</h4>
                {order.extras.map((extra) => (
                  <p key={extra.id}>
                    Extra ID: {extra.id} | Quantity: {extra.quantity}
                  </p>
                ))}
              </div>
              <button
                onClick={() => handleRemove(order.id)} // Remove item from cart
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartDisplay;
