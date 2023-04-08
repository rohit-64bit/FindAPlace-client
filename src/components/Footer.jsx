import React from 'react'
import Logo from '../assets/Image/pngegg.png'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <>
            <div className='bg-[#4DD637] flex justify-between w-full py-7 lg:px-10 flex-col gap-7 lg:gap-0 lg:flex-row '>
                <div className='flex items-center flex-col md:flex-row md:items-start md:justify-around lg:w-[40%] gap-10 md:gap-5 px-5 md:px-10'>
                    <div>
                        <img className='w-16 lg:w-12' src={Logo} alt="Logo" />
                    </div>
                    <div className='flex flex-col text-white font-semibold gap-1.5 items-center md:items-start'>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Home</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Place</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Grounds</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Contact</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Orders</Link>
                    </div>
                    <div className='flex flex-col text-white font-semibold gap-1.5 items-center md:items-start'>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Terms & Condition</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Privacy Policy</Link>
                        <Link className='hover:text-white/80 duration-200 focus:text-white/70'>Refund Policy</Link>
                    </div>
                </div>
                <div className='lg:w-[40%] xl:w-[30%] w-full flex flex-col gap-3 px-5 md:px-20 lg:px-0'>
                    <div className='text-white font-semibold'>Subscribe</div>
                    <div className='flex rounded-full bg-white lg:w-max'>
                        <input className='px-4 py-1 outline-none focus:shadow-lg shadow-md duration-300 rounded-l-full w-full' type="text" placeholder='Enter Your Email...'/>
                        <button className='bg-[#6AC47E] px-4 py-1 shadow-lg uppercase text-white font-semibold rounded-full'>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className='bg-[#22CB5C] flex justify-between py-1 px-5 md:px-16'>
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