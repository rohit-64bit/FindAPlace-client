import React from 'react'
import Logo from '../assets/Image/pngegg.png'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <>
            <div className='bg-[#166534] flex justify-between w-full py-7 lg:px-10 flex-col gap-7 lg:gap-0 lg:flex-row '>

                <div className='flex items-center flex-col md:flex-row md:items-start md:justify-around lg:w-[40%] gap-10 md:gap-5 px-5 md:px-10'>

                    <Link to='/' className='flex gap-2 items-center'>
                        {/* <img className='w-10' src={Building} alt="Logo" /> */}
                        <div className='w-14 h-14 bg-white'></div>
                        <div>
                            <div className='text-white font-bold text-lg'>BOOK A PLACE</div>
                            <div className='text-white font-thin text-sm'>EASY RENTAL</div>
                        </div>
                    </Link>

                    <div className='flex flex-col text-white gap-1.5 items-center md:items-start'>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Home</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Book a Place</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>List a Place</Link>
                    </div>

                    <div className='flex flex-col text-white gap-1.5 items-center md:items-start'>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Terms & Condition</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Privacy Policy</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Refund Policy</Link>
                    </div>

                </div>

                <div className='lg:w-[40%] xl:w-[30%] w-full flex flex-col gap-3 px-5 md:px-20 lg:px-0'>
                    <div className='text-white'>Subscribe</div>
                    <div className='flex rounded-lg bg-white lg:w-max'>
                        <input className='px-4 py-1 outline-none focus:shadow-lg shadow-md duration-300 rounded-l w-full' type="email" placeholder='Enter Your Email...' />
                        <button className='bg-[#208f4b] px-4 py-1 shadow-lg uppercase text-white rounded hover:translate-x-2 duration-300 transition-all ease-in-out'>Subscribe</button>
                    </div>
                </div>

            </div>

            <div className='bg-[#208f4b] flex justify-between items-center py-1 px-5 md:px-16'>

                <div className='text-white sm:font-semibold text-sm md:font-medium'>©2023 Book A Place.com </div>

                <div className='text-white flex gap-3 md:gap-6 text-sm md:font-medium'>

                    <Link><FacebookIcon /></Link>
                    <Link><InstagramIcon /></Link>
                </div>
                
            </div>

        </>
    )
}

export default Footer