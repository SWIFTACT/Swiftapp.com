import React from 'react';
import RestaurantBookcrums from '../component/RestaurantBookcrums';
import RestaurantDisplay from '../component/RestaurantDisplay';
import { useParams } from 'react-router-dom';
import { all_restaurants } from '../assets/all_restaurent';

const Restaurants = () => {
  const { restaurantname } = useParams();
  const restaurant = all_restaurants.find(
    (restaurant) => restaurant.name.toLowerCase() === restaurantname.toLowerCase()
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <RestaurantBookcrums />
      <RestaurantDisplay restaurant={restaurant} />
    </div>
  );
};

export default Restaurants;
