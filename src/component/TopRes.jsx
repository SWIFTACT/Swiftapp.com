import React, { useState } from 'react';
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
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-6'>
        {all_restaurants.slice(0, 6).map((restaurant) => (
          <Link 
            to={`/restaurants/${encodeURIComponent(restaurant.name.toLowerCase().replace(/\s+/g, '-'))}`} 
            key={restaurant.id} 
            className='flex flex-col justify-center items-center'
          >
            <img src={restaurant.bg_image} alt="restaurant" className='rounded-full w-[90%] md:w-2/3 lg:w-full h-auto' />
            <p className='mb-2 shadow-lg rounded-md py-1 text-[10px] text-white bg-primary w-[100px] -mt-[10px] flex items-center justify-center'>
              {restaurant.name}
            </p>
          </Link>
        ))}
      </div>
      <Link to={'/exploremore'} className='w-[70%] flex justify-center'>
        <button className='w-[80%] text-[12px] py-3 text-white font-semibold rounded-[10px] mt-4 bg-primary'>
          {showExploreMore ? 'Show Less' : 'Explore more Restaurants'}
        </button>
      </Link>
    </div>
  );
};

export default TopRes;
