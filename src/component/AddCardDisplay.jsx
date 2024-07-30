import React from 'react';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddCardDisplay = ({handleCLickAddCard}) => {
    return (
        <>
            <h2 className="text-center mb-3 text-xl font-bold">Add Debit Card</h2>
            <FaTimes  className='absolute top-5 right-2' onClick={handleCLickAddCard} />
            <FaChevronLeft  className='absolute top-5 left-2' onClick={handleCLickAddCard} />
            <div className="p-4 border border-[2px] rounded-lg bg-white w-full max-w-md mx-auto shadow-md relative">
                <form className="flex  flex-col">
                    <h2 className='flex justify-center items-center font-[600]'>Enter Card Details</h2>
                    <div className="mb-4 mt-4">
                        <input className="w-full p-2 rounded border border-gray-300 border-[3px]" type="text" id="cardNumber" name="cardNumber" placeholder='Card Number' />
                    </div>
                    <div className='flex gap-4'>
                        <div className="mb-4">
                            <input placeholder='DD/YY' className="w-full p-2 rounded border border-gray-300 border-[3px]" type="text" id="expiry" name="expiry" />
                        </div>
                        <div className="mb-4">
                            <input placeholder='CVV' className="w-full p-2 rounded border border-gray-300 border-[3px]" type="text" id="cvv" name="cvv" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <input placeholder='Card Holder Name' className="w-full p-2 rounded border border-gray-300 border-[3px]" type="text" id="cardHolderName" name="cardHolderName" />
                    </div>
                    <Link onClick={handleCLickAddCard} className=" m-auto text-[12px] flex justify-center p-2 rounded bg-red-500 text-white cursor-pointer mt-2 text-center w-[60%]" type="submit">Add Card</Link>
                </form>
            </div>
        </>
    );
}

export default AddCardDisplay;
