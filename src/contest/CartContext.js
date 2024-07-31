import React, { createContext, useContext, useState } from 'react';

// Utility functions for cart operations
const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(getCart().length);

  const addToCart = (item) => {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
    setCartCount(cart.length);
  };

  const removeFromCart = (itemId) => {
    const cart = getCart().filter(item => item.id !== itemId);
    saveCart(cart);
    setCartCount(cart.length);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
