import React, { useContext } from 'react';
import RestaurantBookcrums from '../component/RestaurantBookcrums';
import RestaurantDisplay from '../component/RestaurantDisplay';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import { ShopContext } from '../context/ShopContext';

const Restaurants = () => {
  const { all_restaurants } = useContext(ShopContext);
  const { restaurantname } = useParams();
  const decodedRestaurantName = decodeURIComponent(restaurantname).toLowerCase().replace(/-/g, ' ');

  const restaurant = all_restaurants.find(
    (restaurant) => restaurant.name.toLowerCase() === decodedRestaurantName
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <RestaurantBookcrums />
      <RestaurantDisplay restaurant={restaurant} />
      <Footer />
    </div>
  );
};

export default Restaurants;
