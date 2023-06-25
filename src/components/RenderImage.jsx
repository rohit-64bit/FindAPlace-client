import React from 'react'
import House from '../assets/Image/house.jpeg'


const RenderImage = () => {
    return (
        <>
            <button className='xl:w-[100px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[120px] duration-300'>
                <img className='rounded-md shadow-md w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:h-[120px] md:w-[120px] xl:h-[100px] lg:h-[80px] lg:w-[80px] xl:w-[100px] object-cover' src={House} alt="image" />
            </button>
        </>
    )
}

export default RenderImage