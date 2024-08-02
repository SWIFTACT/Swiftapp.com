import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartPage = () => {
    const { cart, getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className='p-8'>
            {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className='flex gap-8 flex-col'>
                    {Object.keys(cart).map((itemId) => {
                        const item = cart[itemId];
                        return (
                            <div>
                                <div key={itemId} className=' mb-6 gap-6 flex items-center'>
                                    <img src={item.image} className='w-[50%]' alt="" />
                                    <div className='flex'>

                                        <h2>{item.name}</h2>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Total: {item.price * item.quantity}</p>
                                    </div>
                                    {item.extras && item.extras.length > 0 && (
                                        <div>
                                            <h3>Extras:</h3>
                                            {item.extras.map((extra) => (
                                                <div key={extra.id}>
                                                    <p>{extra.id}: {extra.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                    <h2>Total Amount: {getTotalCartAmount()}</h2>
                </div>
            )}
        </div>
    );
};

export default CartPage;
