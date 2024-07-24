import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { all_restaurants } from '../assets/all_restaurent';

const TopRes = () => {
  const [showExploreMore, setShowExploreMore] = useState(false);

  const handleExploreMore = () => {
    setShowExploreMore(!showExploreMore);
  };

  return (
    <div className='w-full my-20 flex flex-col justify-center items-center'>
      <h1 className='px-4 font-light text-2xl md:text-3xl lg:text-4xl text-black text-center'>
        Top Restaurants and more in Swift
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6'>
        {all_restaurants.slice(0, 6).map((restaurant, index) => (
          <Link 
            to={`/restaurants/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={index} 
            className='flex flex-col justify-center items-center'
          >
            <img src={restaurant.bg_image} alt="restaurant" className='rounded-full w-3/4 md:w-2/3 lg:w-full h-auto' />
            <p className='text-sm md:text-base lg:text-lg mb-2 p-2 shadow-lg rounded-md text-white bg-primary w-auto flex items-center justify-center'>
              {restaurant.name}
            </p>
          </Link>
        ))}
      </div>
      <Link to={'/exploremore'}>
        <button className='w-3/4 md:w-2/3 lg:w-1/2 text-lg py-4 text-white font-semibold rounded-lg mt-20 bg-primary'>
          {showExploreMore ? 'Show Less' : 'Explore more Restaurants'}
        </button>
      </Link>
    </div>
  );
};

export default TopRes;
