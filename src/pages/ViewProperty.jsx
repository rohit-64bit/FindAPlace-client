import React from 'react'
import House from '../assets/Image/house.jpeg'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ViewProperty = () => {
    return (
        <>
            <div className='w-full py-5 xl:py-10 lg:h-[87vh] flex flex-col lg:flex-row xl:items-center lg:px-16 xl:px-28'>

                <div className='lg:w-[30%] h-full'>

                    <div className='flex flex-col px-4 md:px-10 lg:px-0 lg:py-14 xl:py-10 gap-5 justify-start duration-300'>

                        <div className='w-[280px] md:w-[350px] lg:w-[260px] xl:w-[350px]'>
                            <img className='rounded-2xl w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[260px] lg:h-[260px] xl:w-[350px] xl:h-[350px] object-cover shadow-md' src={House} alt="image" />
                        </div>

                        <div className='flex gap-3'>

                            <button className='xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] duration-300 lg:opacity-50 hover:opacity-100'>
                                <img className='rounded-md shadow-md w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:h-[80px] md:w-[80px] xl:h-[80px] lg:h-[80px] lg:w-[80px] xl:w-[80px] object-cover' src={House} alt="image" />
                            </button>

                            <button className='xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] duration-300 lg:opacity-50 hover:opacity-100'>
                                <img className='rounded-md shadow-md w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:h-[80px] md:w-[80px] xl:h-[80px] lg:h-[80px] lg:w-[80px] xl:w-[80px] object-cover' src={House} alt="image" />
                            </button>

                            <button className='xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] duration-300 lg:opacity-50 hover:opacity-100'>
                                <img className='rounded-md shadow-md w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:h-[80px] md:w-[80px] xl:h-[80px] lg:h-[80px] lg:w-[80px] xl:w-[80px] object-cover' src={House} alt="image" />
                            </button>

                        </div>
                    </div>
                </div>
                <div className='lg:w-[70%] h-full'>

                    <div className='flex flex-col py-10 gap-3 lg:py-14 xl:py-20 lg:gap-4 xl:gap-5 px-4 md:px-10'>

                        <div className='py-3 text-3xl font-bold'>
                            Golf Course
                        </div>
                        <div className='text-slate-500'>
                            Welcome to our premier golf course, where beauty and challenge intersect to create an unforgettable golfing experience. Our meticulously maintained course features 18 holes of championship golf set against a stunning backdrop of rolling hills, lush greenery, and sparkling water hazards.
                        </div>
                        <div>
                            <div className='text-slate-500 px-1'>
                                Available
                            </div>
                            <div className='text-slate-500 flex gap-1'>
                                <EventAvailableIcon />
                                <div>01 May 2023</div>
                            </div>
                        </div>
                        <div className='text-xl font-semibold'>
                            $200 /hr
                        </div>
                        <button className='bg-[#4DD637] text-sm text-white px-8 py-1.5 font-semibold hover:shadow-md duration-300 w-max'>
                            RENT PLACE
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProperty