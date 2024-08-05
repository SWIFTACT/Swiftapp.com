import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaChevronRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const CartDisplay = () => {
    const { getTotalCartAmount, cart } = useContext(ShopContext);
    const navigate = useNavigate();

    // Group cart items by restaurant
    const cartItemsByRestaurant = Object.keys(cart).reduce((acc, itemId) => {
        const item = cart[itemId];
        const { restaurant } = item;

        if (restaurant && restaurant.name) {
            if (!acc[restaurant.name]) {
                acc[restaurant.name] = {
                    bg_image: restaurant.bg_image,
                    items: []
                };
            }
            acc[restaurant.name].items.push(item);
        }

        return acc;
    }, {});

    const totalCartAmount = getTotalCartAmount();

    if (Object.keys(cartItemsByRestaurant).length === 0) {
        return <p className="text-center text-gray-500">Your cart is empty.</p>;
    }

    const handleClickToCheckout = (restaurantName) => {
        // Filter items by the selected restaurant
        const restaurantItems = cartItemsByRestaurant[restaurantName]?.items || [];
        // Store the selected restaurant name in localStorage to be accessed in CheckoutPage
        localStorage.setItem('selectedRestaurant', restaurantName);
        navigate('/mycart/checkout');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {Object.keys(cartItemsByRestaurant).map((restaurantName, index) => {
                const restaurant = cartItemsByRestaurant[restaurantName];
                return (
                    <div key={index} className="border-b flex flex-col border-gray-300 pb-4 mb-4">
                        <img src={restaurant.bg_image} alt={restaurantName} className="w-full h-32 object-cover mb-4 rounded" />
                        <div onClick={() => handleClickToCheckout(restaurantName)} className='flex justify-between cursor-pointer items-center'>
                            <h3 className="text-xl font-semibold">{restaurantName}</h3>
                            <div className='flex gap-2 justify-center items-center'>
                                <p className="rounded-full px-2 flex items-center justify-center bg-primary text-white font-[600] text-[12px]">{restaurant.items.length}</p>
                                <FaChevronRight />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartDisplay;
