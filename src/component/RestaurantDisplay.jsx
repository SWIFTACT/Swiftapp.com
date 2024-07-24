import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import menu from '../assets/menu.png';
import review from '../assets/review.png';
import info from '../assets/info.png';
import cart from '../assets/cartred.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RestaurantDisplay = ({ restaurant }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-[20px] font-[600]'>{restaurant.name}</h1>
        <div className='flex items-center w-fit text-white justify-center gap-2 px-3 py-1 bg-[#333] rounded-[20px] '>
          <FaSearch className='text-[12px]' />
          <input placeholder={`Search in ${restaurant.name}`} className='w-[100%] text-[12px] ' />
        </div>
      </div>
      <div>
        <ul className='flex justify-between mt-4'>
          <Link to="#" className='flex justify-center items-center gap-2  p-3 border border-primary'>
            <img src={menu} alt="Menu" className='w-3' />
            <p className='text-[12px]'>Menu</p>
          </Link>
          <Link to="#" className='flex justify-center items-center gap-2 p-3 border border-primary'>
            <img src={review} alt="Review" className='w-3' />
            <p className='text-[12px]'>Review</p>
          </Link>
          <Link to="#" className='flex justify-center items-center gap-2 p-2 border border-primary'>
            <img src={info} alt="Information" className='w-3' />
            <p className='text-[12px]'>Information</p>
          </Link>
          <Link to="#" className='flex justify-center items-center gap-2 p-2 border border-primary'>
            <img src={cart} alt="My Cart" className='w-3' />
            <p className='text-[12px]'>My Cart</p>
          </Link>
        </ul>

        <div className='mt-4'>

          <Slider {...settings}  className=''>
            {restaurant.menu.map((menuItem, index) => (
              <div key={index} className='w-full slider-restaurant-menu  flex items-center justify-center '>
                <h3 className='w-[100%]  flex justify-center items-center text-[13px] border border-primary slider-restaurant-menu'>{menuItem}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDisplay;
