import React, { useRef } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import AddCardDisplay from './AddCardDisplay';

const PaymentDisplay = () => {

    const addcardRef = useRef()
    const overlayRef = useRef();

    const handleCLickAddCard = ()=>{
        overlayRef.current.classList.toggle('overlay-active');
        addcardRef.current.classList.toggle('add-card-div-responsiveness');

    }

    return (
        <div className='p-4 h-[60vh]'>
            <h2 className='font-[700] '>Payment Method</h2>
            <div className='flex flex-col gap-6 mt-4 p-4'>
                <Link onClick={handleCLickAddCard} className='flex items-center justify-between'>
                    <Link>Add Debit Card</Link>
                    <FaChevronRight />
                </Link>
                <Link className='flex items-center justify-between'>
                    <Link>Remove Debit Card</Link>
                    <FaChevronRight />
                </Link>


            </div>

            <div ref={addcardRef} className='add-card-div'>
                    <AddCardDisplay handleCLickAddCard={handleCLickAddCard} />
            </div>
            <div ref={overlayRef} className="overlay"></div>
        </div>
    );
}

export default PaymentDisplay;
