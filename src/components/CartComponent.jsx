import React from 'react'
import House from '../assets/Image/house.jpeg'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


const CartComponent = () => {
    return (
        <>
            <div className='flex w-full items-center gap-8 py-5'>
                
                <div className='w-[280px] md:w-[350px] lg:w-[260px] xl:w-[200px]'>
                    <img className='rounded-2xl w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[260px] lg:h-[260px] xl:w-[200px] xl:h-[200px] object-cover shadow-md' src={House} alt="" />
                </div>

                <div className='flex flex-col gap-1 w-[75%]'>

                    <div className='py-1 text-3xl font-bold'>
                        Golf Course
                    </div>
                    <div className='text-slate-500 text-sm'>
                        Welcome to our premier golf course, where beauty and challenge intersect to create an unforgettable golfing experience. Our meticulously maintained course features 18 holes of championship golf set against a stunning backdrop of rolling hills, lush greenery, and sparkling water hazards.
                    </div>
                    <div className='text-sm'>
                        <div className='text-slate-500 px-1'>
                            Available
                        </div>
                        <div className='text-slate-500 flex gap-1 items-center'>
                            <EventAvailableIcon />
                            <div>01 May 2023</div>
                        </div>
                    </div>
                    <div className='text-xl font-semibold'>
                        $200 /hr
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartComponent