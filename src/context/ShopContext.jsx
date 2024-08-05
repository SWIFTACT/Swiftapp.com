import React, { createContext, useState } from 'react';
import { all_restaurants } from '../assets/all_restaurent';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cart, setCart] = useState({});

    const addToCart = (item) => {
        setCart((prevCart) => {
          const newCart = { ...prevCart };
          const itemId = item.id;
      
          if (newCart[itemId]) {
            newCart[itemId].quantity += item.quantity;
            newCart[itemId].extras = item.extras;
          } else {
            newCart[itemId] = { ...item };
          }
      
          return newCart;
        });
      };


    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[itemId] && newCart[itemId].quantity > 0) {
                newCart[itemId].quantity -= 1;
                if (newCart[itemId].quantity === 0) {
                    delete newCart[itemId];
                }
            }
            return newCart;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cart) {
            const cartItem = cart[itemId];
            if (cartItem.quantity > 0) {
                const product = findProductById(itemId);
                if (product) {
                    totalAmount += product.price * cartItem.quantity;
                    cartItem.extras.forEach(extra => {
                        totalAmount += extra.price * extra.quantity;
                    });
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemId in cart) {
            totalItems += cart[itemId].quantity;
        }
        return totalItems;
    };

    const findProductById = (itemId) => {
        for (const restaurant of all_restaurants) {
            const product = restaurant.food.find((food) => food.id === Number(itemId));
            if (product) return product;
        }
        return null;
    };

    const findProduct = (searchTerm) => {
        for (const restaurant of all_restaurants) {
            const product = restaurant.food.find((food) => 
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (product) return product;
        }
        return null;
    };

    const contextValue = {
        all_restaurants,
        cart,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        findProduct,
        findProductById
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
