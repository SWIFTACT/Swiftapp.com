import React from 'react'
import hiw1 from '../assets/hiw1.png'
import hiw2a from '../assets/hiw2a.png'
import hiw2b from '../assets/hiw2b.png'
import hiw3 from '../assets/hiw3.png'

const HIW = () => {
    return (
        <div className='w-[75%]  m-auto'>
            <h1 className='font-[500] lg:text-[60px] text-[30px] flex items-center justify-center'>How it works</h1>
            <div className='lg:flex md:flex my-[2rem]  justify-between items-center'>
                <div className='flex lg:w-[25%] md:w-[30%]  mb-20  w-[100%]  h-[120px] flex-col justify-between items-center'>
                    <div><img src={hiw1} alt="" /></div>
                    <h4 className='lg:text-[30px] mb- text-[20px]'>1.Search</h4>
                    <p className='text-center text-[20px]'>Search for restuarant close to you</p>
                </div>
                <div className='flex lg:w-[25%] md:w-[30%] mb-32 w-[100%] h-[120px] flex-col justify-between items-center'>
                    <div className='flex gap-3'><img src ={hiw2a} alt="" /> <img src= {hiw2b} alt="" /></div>
                    <h4 className='lg:text-[30px] mb- text-[20px]'>2. Order and pay</h4>
                    <p className='text-center text-[20px]'>Order a meal you are craving for and pay through out payment gateway</p>
                </div>
                <div className='flex flex-col md:w-[30%] h-[110px] lg:w-[25%] w-[100%] justify-between items-center'>
                    <div><img src={hiw3} alt="" /></div>
                    <h4 className='lg:text-[30px] mb- text-[20px]'>3. Delivery or pick up</h4>
                    <p className='text-center text-[20px]'>Have your meal delivered hot and fast or self pick. Enjoy your meal</p>
                </div>
            </div>
        </div>
    )
}

export default HIW