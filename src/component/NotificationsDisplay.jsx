import React from 'react';

const NotificationsSettings = () => {
  return (
    <div className='flex w-full justify-center items-center flex-col'>
      <h3 className='w-full items-center bg-primary justify-start px-6 flex my-4 text-[18px] text-white py-4 font-[500]'>Notifications</h3>
      <div className='px-6 self-start w-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-[500]'>Enable All</p>
              <p className='text-[10px]'>Activate all notifications</p>
            </div>
            <input type='checkbox' className='toggle-checkbox' />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-[500]'>Newsletters</p>
              <p className='text-[10px]'>Receive newsletters to stay up-to-date with what’s brewing <br /> in the food industry</p>
            </div>
            <input type='checkbox' className='toggle-checkbox' />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-[500]'>Promos and offers</p>
              <p className='text-[10px]'>Receive updates about promotions and money saving offers</p>
            </div>
            <input type='checkbox' className='toggle-checkbox' />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-[500]'>Orders and purchases</p>
              <p className='text-[10px]'>Receive updates related to your order status</p>
            </div>
            <input type='checkbox' className='toggle-checkbox' />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-[500]'>Important updates</p>
              <p className='text-[10px]'>Receive important updates related to your account</p>
            </div>
            <input type='checkbox' className='toggle-checkbox' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsSettings;
