import React from 'react';
import Navbar from '../component/Navbar';
import OrderDisplay from '../component/OrderDisplay';
import { useParams } from 'react-router-dom';
import { all_restaurants } from '../assets/all_restaurent';
import Footer from '../component/Footer';

const OrderPage = () => {
    const { restaurantId } = useParams(); // Extract restaurant ID from the URL
    const restaurant = all_restaurants.find(rest => rest.id === parseInt(restaurantId)); // Find the restaurant

    return (
        <div>
            <Navbar />
            {restaurant ? <OrderDisplay restaurant={restaurant} /> : <p>Restaurant not found</p>}
            <Footer />
        </div>
    );
}

export default OrderPage;
