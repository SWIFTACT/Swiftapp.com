import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { RiDeleteBin2Line } from "react-icons/ri";
import {  Navigate, useNavigate } from 'react-router-dom';

const CheckoutDisplay = ({ items }) => {
    const { removeFromCart } = useContext(ShopContext);
    const deliveryFee = 2000;

    const navigate = useNavigate()

    if (!items || items.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    // Calculate the total amount for each item, including extras, and the grand total
    const itemTotals = items.map(item => {
        const itemTotal = item.price * item.quantity;
        const extrasTotal = item.extras.reduce((sum, extra) => sum + (extra.price * extra.quantity), 0);
        return itemTotal + extrasTotal;
    });
    const subtotal = itemTotals.reduce((acc, curr) => acc + curr, 0);
    const grandTotal = subtotal + deliveryFee;

    const handleCheckoutToPayment = ()=>{
        navigate('/mycart/checkout/payment')
    }

    return (
        <div className='p-4'>
            {items.map((item, index) => (
                <div key={index} className="border-b relative flex items-center justify-between border-gray-900 pb-4 mb-4">
                    <RiDeleteBin2Line
                        onClick={() => removeFromCart(item.id)}
                        className='absolute right-5 top-0 cursor-pointer'
                    />
                    <img src={item.image} className='w-[40%]' alt={item.name} />
                    <div className="flex flex-col">
                        <p className="text-gray-700">{item.name} x {item.quantity}</p>
                        <p className="text-gray-700 text-[22px] font-[700]">N{(item.price * item.quantity).toFixed(2)}</p>
                        {item.extras && item.extras.length > 0 && (
                            <ul className=" pl-5 mt-2 text-gray-600">
                                {item.extras.map((extra, extraIndex) => (
                                    <li key={extraIndex}>
                                        {extra.name} x {extra.quantity} - N{(extra.price * extra.quantity).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
            <div className="mt-4">
                <p className="text-gray-700 font-[700] text-[22px]">Subtotal: N{subtotal.toFixed(2)}</p>
                <p className="text-gray-700 font-[700] text-[22px]">Delivery Fee: N{deliveryFee.toFixed(2)}</p>
                <p className="text-gray-700 font-[700] text-[22px]">Total: N{grandTotal.toFixed(2)}</p>
            </div>

            <div
                onClick={ handleCheckoutToPayment}
                className='bg-primary flex justify-center items-center w-[80%] m-auto mt-6 text-white py-2'
            >
                Check Out
            </div>
        </div>
    );
};

export default CheckoutDisplay;
