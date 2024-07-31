import React, { useEffect, useState } from 'react';
import { FaRegStar, FaSearch, FaStar, FaStarHalf } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import menuIcon from '../assets/menu.png';
import reviewIcon from '../assets/review.png';
import infoIcon from '../assets/info.png';
import cartIcon from '../assets/cartred.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from './Cart';
import { reviews } from '../assets';

const RestaurantDisplay = ({ restaurant }) => {
  const [activeLink, setActiveLink] = useState('menu');
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [filteredFood, setFilteredFood] = useState(restaurant.food);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set the activeLink based on the current URL hash
    const hash = location.hash.replace('#', '') || 'menu';
    setActiveLink(hash);
  }, [location.hash]);

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

  const handleMenuItemClick = (food) => {
    // Navigate to the OrderPage with the restaurant ID and food item ID as parameters
    navigate(`/order/${restaurant.id}/${food.id}`);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(`#${link}`); // Update URL hash without reloading the page
  };

  const handleMenuItemFilter = (menuItem) => {
    setActiveMenuItem(menuItem);
    const filtered = restaurant.food.filter(foodItem =>
      foodItem.name.toLowerCase().includes(menuItem.toLowerCase())
    );
    setFilteredFood(filtered);
  };

  const renderMenuItems = () => (
    <div>
      <div className='mt-4'>
        <Slider {...settings} className=''>
          {restaurant.menu.map((menuItem, index) => (
            <div
              key={index}
              className={`w-full slider-restaurant-menu ${activeMenuItem === menuItem ? 'active' : ''}`}
              onClick={() => handleMenuItemFilter(menuItem)}
            >
              <h3 className='w-[100%] flex justify-center items-center text-[13px] border border-primary slider-restaurant-menu'>
                {menuItem}
              </h3>
            </div>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredFood.map((menu, index) => (
          <div key={index} className="flex flex-col items-center justify-between p-4 rounded-lg text-center">
            <div>
              <img src={menu.image} alt="" className="w-full h-auto rounded-lg mb-4" />
              <p className="text-[12px] text-left font-medium">{menu.name}</p>
              <p className='text-[12px] text-left font-medium'>${menu.price}</p>
            </div>
            <button
              className="px-4 py-1 text-[12px] bg-primary w-[100%] text-white rounded-[10px]"
              onClick={() => handleMenuItemClick(menu)} // Pass the menu item object
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className='flex flex-col gap-8 my-8'>
      <h1 className='flex justify-center'>What People Say About Us</h1>
      <div className='grid grid-cols-2 gap-8'>
        {reviews.map((review, index) => (
          <div
            className='border bg-[#FAFAFAFA] w-[100%] border-[#DED6D6] p-4'
            key={index}
          >
            <div className='flex gap-4 items-center mb-4'>
              <img src={review.image} alt="" className='rounded-full w-12' />
              <p className='text-[12px] font-[600]'>{review.name}</p>
            </div>
            <p className='text-[12px] mb-4'>{review.context}</p>
            <div className='flex justify-between'>
              <p className='text-[8px] opacity-70'>{review.time}</p>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(review.rating) ? <FaStar key={i} className='text-primary text-[8px]' /> :
                  i < review.rating ? <FaStarHalf key={i} className='text-primary text-[8px]' /> :
                  <FaRegStar key={i} className='text-primary text-[8px]' />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p>Rate Us</p>
        <div className='text-[12px] bg-[#DED6D6] w-[60%]'>
          <textarea placeholder='Add Comment' className='outline-none p-2 bg-[#DED6D6] h-20 w-full'></textarea>
          <div className='flex justify-end -mt-4 my-2 p-2 gap-1 text-primary'>
            {[...Array(5)].map((_, i) => (
              <FaRegStar key={i} className='' />
            ))}
          </div>
        </div>
        <button className='bg-primary mt-4 text-white w-[30%] text-[10px] py-2'>Send</button>
      </div>
    </div>
  );

  const renderInformation = () => (
    <div>
      <p className='font-semibold text-lg'>Address:</p>
      <p className='text-sm'>{restaurant.information[0].address}</p>
      <p className='text-[16px] font-[600] mt-4'>Opening Hours:</p>
      <ul className='list-none p-0 m-0'>
        {Object.keys(restaurant.information[0].hours).map(day => (
          <li key={day} className='relative pb-4'>
            <span className='text-sm mt-4 font-medium w-[60%] flex justify-between'>
              <strong className='text-[12px]'>{day}:</strong> <p className='text-[12px]'>{restaurant.information[0].hours[day]}</p>
            </span>
            <div className='absolute bottom-0 left-0 w-[60%] border-b border-gray-300'></div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderCart = () => (
    <Cart />
  );

  const renderContent = () => {
    switch (activeLink) {
      case 'menu':
        return renderMenuItems();
      case 'review':
        return renderReviews();
      case 'info':
        return renderInformation();
      case 'cart':
        return renderCart();
      default:
        return renderMenuItems();
    }
  };

  return (
    <div className='px-6 py-2'>
      <img src={restaurant.bg_image_main} alt="" className='mb-6' />
      <div className='flex justify-between items-center'>
        <h1 className='text-[20px] font-[600]'>{restaurant.name}</h1>
        <div className='flex items-center w-fit text-black justify-center gap-2 px-3 py-1 bg-[#F4EEEE] rounded-[20px]'>
          <FaSearch className='text-[12px]' />
          <input placeholder={`Search in ${restaurant.name}`} className='w-[100%] text-black text-[12px]' />
        </div>
      </div>
      <div>
        <ul className='flex justify-between mt-4'>
          <li
            className={`link-item ${activeLink === 'menu' ? 'active' : ''}`}
            onClick={() => handleLinkClick('menu')}
          >
            <img src={menuIcon} alt="Menu" className='w-3' />
            <p className='text-[10px]'>Menu</p>
          </li>
          <li
            className={`link-item ${activeLink === 'review' ? 'active' : ''}`}
            onClick={() => handleLinkClick('review')}
          >
            <img src={reviewIcon} alt="Review" className='w-3' />
            <p className='text-[10px]'>Review</p>
          </li>
          <li
            className={`link-item ${activeLink === 'info' ? 'active' : ''}`}
            onClick={() => handleLinkClick('info')}
          >
            <img src={infoIcon} alt="Information" className='w-3' />
            <p className='text-[10px]'>Information</p>
          </li>
          <li
            className={`link-item ${activeLink === 'cart' ? 'active' : ''}`}
            onClick={() => handleLinkClick('cart')}
          >
            <img src={cartIcon} alt="Cart" className='w-3' />
            <p className='text-[10px]'>Cart</p>
          </li>
        </ul>
      </div>
      {renderContent()}
    </div>
  );
};

export default RestaurantDisplay;
