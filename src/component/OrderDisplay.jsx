import React, { useState, useEffect, useContext } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const OrderDisplay = ({ restaurant }) => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [extraQuantities, setExtraQuantities] = useState({});
  const [notification, setNotification] = useState('');
  const { addToCart } = useContext(ShopContext); // Access context
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurant && restaurant.food) {
      const foundItem = restaurant.food.find(food => food.id === parseInt(itemId));
      setItem(foundItem);
    }
  }, [itemId, restaurant]);

  if (!item) return <div className="text-center text-gray-500">Loading...</div>;

  const handleAddToCart = () => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
      extras: selectedExtras.map(extra => ({
        ...extra,
        quantity: extraQuantities[extra.id] || 0
      }))
    };

    addToCart(cartItem);

    setNotification('One Item Added to Cart');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleToggleExtra = (extra) => {
    setSelectedExtras(prevSelectedExtras =>
      prevSelectedExtras.includes(extra)
        ? prevSelectedExtras.filter(e => e !== extra)
        : [...prevSelectedExtras, extra]
    );
  };

  const handleIncreaseExtraQuantity = (extra) => {
    if (selectedExtras.includes(extra)) {
      setExtraQuantities(prevQuantities => ({
        ...prevQuantities,
        [extra.id]: (prevQuantities[extra.id] || 0) + 1
      }));
    }
  };

  const handleDecreaseExtraQuantity = (extra) => {
    if (selectedExtras.includes(extra)) {
      setExtraQuantities(prevQuantities => {
        const currentQuantity = prevQuantities[extra.id] || 0;
        return {
          ...prevQuantities,
          [extra.id]: Math.max(currentQuantity - 1, 0)
        };
      });
    }
  };

  const totalPrice = (
    item.price * quantity +
    selectedExtras.reduce((sum, extra) => {
      const extraItem = item.extra.find(e => e.id === extra.id);
      return sum + (extraItem ? extraItem.price * (extraQuantities[extraItem.id] || 0) : 0);
    }, 0)
  ).toFixed(2);

  return (
    <div className="p-4">
      <div className='flex items-center gap-4'>
        <img
          src={item.image}
          alt={item.name}
          className="w-[45%] rounded-[10px] flex justify-center h-auto rounded-lg mb-4 shadow-lg"
        />
        <div>
          <h2 className="text-[12px] font-semibold mb-2">{item.name}</h2>
          <p className="text-[12px] font-medium text-gray-700 mb-2">${item.price}</p>
          <div className='flex gap-4 items-center'>
            <button
              className='bg-gray-200 px-3 py-1 rounded'
              onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))}
            >
              -
            </button>
            <p className='text-[12px] font-medium'>{quantity}</p>
            <button
              className='bg-gray-200 px-3 py-1 rounded'
              onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}
            >
              +
            </button>
          </div>
          <p className="text-[15px] mt-6 font-[700] text-gray-700">Total: N{totalPrice}</p>
        </div>
      </div>
      <h3 className="mt-6 text-[15px] font-semibold">Extra (optional)</h3>
      {item.extra && item.extra.length > 0 ? (
        item.extra.map((extraItem) => (
          <div key={extraItem.id} className="flex mt-8 justify-between items-center my-2">
            <div className="flex items-center w-[70%] justify-between">
              <div className='flex flex-col'>
                <p className="text-[16px] font-[600]">{extraItem.name}</p>
                <p className="text-[12px]">N{extraItem.price}</p>
              </div>
              <input
                type="checkbox"
                checked={selectedExtras.includes(extraItem)}
                onChange={() => handleToggleExtra(extraItem)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                className='bg-gray-200 px-3 py-1 rounded'
                onClick={() => handleIncreaseExtraQuantity(extraItem)}
                disabled={!selectedExtras.includes(extraItem)}
              >
                +
              </button>
              <p className='text-[12px] font-medium'>{extraQuantities[extraItem.id] || 0}</p>
              <button
                className='bg-gray-200 px-3 py-1 rounded'
                onClick={() => handleDecreaseExtraQuantity(extraItem)}
                disabled={!selectedExtras.includes(extraItem)}
              >
                -
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[12px] text-gray-500">No extras available</p>
      )}
      <div className='mt-4'>
        <p className='text-[14px] font-[600] mb-2'>Special Instruction</p>
        <textarea className='bg-[333] border outline-none border-black border-[1px] h-[100px] p-2 w-[70%] text-[12px]' placeholder='Add a note'></textarea>
        <p className='text-[12px]'>Note you will be charged with extra</p>
      </div>
      <button
        className='text-primary flex mt-4 text-[12px] gap-2 items-center'
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        <FaChevronLeft />
        <p>Add more orders</p>
      </button>
      <button
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary mt-6"
        onClick={handleAddToCart} // Handle adding to cart
      >
        Add {quantity} to Cart N{totalPrice}
      </button>
      {notification && (
        <div className='fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded'>
          {notification}
        </div>
      )}
    </div>
  );
};

export default OrderDisplay;
