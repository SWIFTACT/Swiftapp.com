import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topResturants } from '../assets';

const ExploreSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div>
        <h1 className='px-4 font-light text-2xl md:text-3xl lg:text-4xl text-black text-center'>
          Discount Alert: Get 25% off All orders this Week!
        </h1>
        <Slider {...settings} className='mt-10 px-6'>
          {topResturants.map((restaurent, index) => (
            <div key={index} className='flex flex-col justify-center items-center'>
              <img src={restaurent.image} alt="restaurant" className='rounded-full w-3/4 md:w-2/3 lg:w-full h-auto' />
              <p className='text-sm md:text-base lg:text-lg mb-2 p-2 shadow-lg rounded-md text-white bg-primary w-auto flex items-center justify-center'>
                {restaurent.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default ExploreSlide;
