import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from '../assets/bg1.png';
import image2 from '../assets/bg2.png';
import image3 from '../assets/bg3.png';
import image4 from '../assets/bg4.png';
import { styles } from '../style';

const Intro = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,  // Prevent stopping on hover
    pauseOnFocus: false,  // Prevent stopping on focus
    // fade: true,  // Use the fade effect for smooth transitions
  };

  return (
    <>

      <div className='absolute top-[214px] left-[50px] text-white z-10'>
        <h1 className={` ${styles.sectionHeadText}  font-[700]`}>Order on Foodhub</h1>
        <p className={` ${styles.sectionSubText}  font-[400] -mt-[1rem] mb-[3rem]`}>Get food, drinks, pastries, pharmacies and more.</p>
        <div className='flex relative justify-between sm:py-8 px-12 py-5 px-4  bg-white outline-none w-[90%] lg:w-[90%] xl:w-[110%] m:w-[90%]'>
          <input type="text" placeholder='search for anything, e.g nearest restaurant close to you' className='w-full  text-[11px] sm:text-[20px] text-black outline-none h-full' />
          <button className='bg-primary absolute right-0 top-0 p-a w-[60px]  text-[10px] sm:text-[20px] sm:w-[123px] shadow-custom-thick h-full rounded-tl-[30px] rounded-bl-[50px] '>Search</button>
        </div>
      </div>
      <Slider {...settings} className='bg-black'>
        <div>
          <img
            src={image1}
            alt="Slide 1"
            style={{
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              // opacity: '0.5',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              opacity: '0.7'
            }}
          />
        </div>
        <div>
          <img
            src={image2}
            alt="Slide 2"
            style={{
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              // opacity: '0.5',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              opacity: '0.7'
            }}
          />
        </div>
        <div>
          <img
            src={image3}
            alt="Slide 3"
            style={{
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              // opacity: '0.5',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              opacity: '0.7'
            }}
          />
        </div>
        <div>
          <img
            src={image4}
            alt="Slide 4"
            style={{
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              // opacity: '0.5',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              opacity: '0.7'
            }}
          />
        </div>
      </Slider>
    </>



  );
};

export default Intro;
