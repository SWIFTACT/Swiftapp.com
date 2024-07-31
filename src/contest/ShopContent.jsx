// ShopContext.js
import React, { createContext, useState } from 'react';
import { all_restaurants } from '../assets/all_restaurent';

export const ShopContent = createContext(null);

const ShopContextProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
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
        findProduct
    };

    return (
        <ShopContent.Provider value={contextValue}>
            {props.children}
        </ShopContent.Provider>
    );
};


export default ShopContextProvider;
