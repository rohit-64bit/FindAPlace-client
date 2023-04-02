import React from 'react'
import Location from '../assets/Image/homeLocation2.png'
import Items from '../components/Items'
import Review from '../components/Review'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='w-full flex lg:justify-between px-4 lg:px-10 h-full duration-300 items-center'>

                <div className='flex justify-center flex-col gap-5 px-[7%] absolute lg:relative'>
                    <div className='text-[#4DD637] text-2xl lg:text-4xl font-semibold'>A PLACE OF YOUR CHOICE</div>
                    <div className='text-[#4DD637] lg:font-semibold lg:text-lg'>The perfect site to book place of your choice or to rent your vacant place and earn</div>
                    <div className='gap-3 lg:gap-5 flex'>
                        <Link>
                            <button className='bg-[#4DD637] text-white py-1 px-2 lg:py-1.5 lg:px-6 font-semibold text-sm hover:shadow-md duration-300'>BOOK PLACE</button>
                        </Link>
                        <Link>
                            <button className='border-2 border-[#4DD637] text-[#4DD637] py-1 px-2 lg:py-1.5 lg:px-6 font-semibold text-sm hover:shadow-md duration-300'>LIST PLACE</button>
                        </Link>
                    </div>
                </div>

                <div className='lg:w-[50%] w-full flex md:justify-center'>
                    <img className='w-auto md:w-[50%] lg:w-[70%] opacity-10 lg:opacity-100' src={Location} alt="Image" />
                </div>
            </div>

            <div className='bg-[#CAD5E2]/40 flex justify-center flex-col py-4 lg:py-5 w-full'>
                <div className='text-[#4DD637] text-lg font-semibold flex justify-center w-full'>TOP RATED PLACE</div>
                <div className='grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 lg:px-5 py-5'>
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                </div>
            </div>

            <div className='bg-white flex justify-center flex-col w-full py-4 lg:py-5'>
                <div className='text-[#4DD637] text-lg font-semibold flex justify-center'>CUSTOMER REVIEWS</div>
                <div className='grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 lg:px-5 py-5'>
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>

            <div className='bg-[#CAD5E2]/40 py-8 lg:py-10 '>
                <div className='text-[#4DD637] text-lg font-semibold flex justify-center py-5'>CONTACT US</div>
                <div className='flex flex-col items-center gap-5 w-full px-4 md:px-10'>
                    <div className='flex flex-col md:flex-row gap-5 w-full lg:w-[40%] duration-300'>
                        <input className='px-5 py-2 rounded-full shadow-lg outline-none focus:shadow-xl duration-300 w-full' type="text" placeholder='Name' />
                        <input className='px-5 py-2 rounded-full shadow-lg outline-none focus:shadow-xl duration-300 w-full' type="text" placeholder='Email' />
                    </div>
                    <textarea className='lg:w-[40%] rounded-lg px-5 py-2 shadow-lg outline-none focus:shadow-xl duration-300 w-full' placeholder='Message' name="" id="" cols="30" rows="7"></textarea>
                    <button className='bg-[#4DD637] lg:w-[15%] text-white py-1.5 rounded-full shadow-lg hover:shadow-xl duration-300 w-full'>SUBMIT</button>
                </div>
            </div>

            <div className='bg-white flex justify-center py-10 w-full'>
                <div className='p-5 flex flex-col items-center w-full md:w-[75%] lg:w-[25%]'>
                    <div className='flex text-center py-3 font-semibold text-black/60'>lorem ipsum sample text message from the owner of the website</div>
                    <div className='text-black font-bold text-lg'>OWNER NAME</div>
                    <div className='text-black/30 font-semibold'>Owner</div>
                </div>
            </div>
        </>
    )
}

export default Home