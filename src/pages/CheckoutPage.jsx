import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import CheckoutDisplay from '../component/CheckoutDisplay';

const CheckoutPage = () => {
  const { cart } = useContext(ShopContext);
  const selectedRestaurantName = localStorage.getItem('selectedRestaurant');
  
  // Filter items based on the selected restaurant
  const items = Object.keys(cart).reduce((acc, itemId) => {
    const item = cart[itemId];
    const { restaurant } = item;

    if (restaurant && restaurant.name === selectedRestaurantName) {
      acc.push(item);
    }

    return acc;
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        {items.length > 0 ? (
          <CheckoutDisplay items={items} />
        ) : (
          <p className="text-center text-gray-500">No items to display.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
