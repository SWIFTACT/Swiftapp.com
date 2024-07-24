import React from 'react'
import { details } from '../assets'

const Details = () => {
    return (
        <div className='w-[90%] m-auto mt-[10rem] items-center md:flex md:flex-col md:justify-center md:items-center  lg:flex lg:gap-[2rem] justify-center'>
            {
                details.map((item, index) => (
                    <div key={index}
                        className='flex flex-col lg:w-[25%] w-[100%] justify-center '
                    >
                        <img src={item.image} alt=""   className='flex w-[500px] rounded-[20px] h-[500px]  justify-center' />
                        <div className='flex flex-col   items-between lg:justify-between h-[250px]'>
                            <h4 className='font-[800] lg:text-[28px] text-[20px] my-3'>{item.text}</h4>
                            <p className='text-[20px] lg:text-[28px]  lg:mt-0 flex '>{item.details}</p>
                            <button className='lg:mt-4 w-[100%] flex justify-start py-2 px-5 bg-primary w-fit mt-3 rounded-[7px] text-white text-[16px]'>{item.button}</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Details