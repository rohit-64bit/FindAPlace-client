import React from 'react'
import Logo from '../assets/Image/pngegg.png'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LogoBW from '../assets/logo-bw.png';

const Footer = () => {
    return (
        <>

            <div className='bg-slate-200 py-10'>

                <div className="flex flex-col items-center gap-5">

                    <Link to='/' className='flex items-center w-max'>

                        <img className='w-32' src={LogoBW} alt="" />

                    </Link>

                    <div className='flex flex-col items-center md:flex-row gap-2 md:gap-4'>

                        <Link className='text-black/70 hover:text-black duration-200'>Terms & Condition</Link>
                        <Link className='text-black/70 hover:text-black duration-200'>Privacy Policy</Link>
                        <Link className='text-black/70 hover:text-black duration-200'>Refund Policy</Link>

                    </div>

                </div>

            </div>

            <div className='bg-slate-300 flex justify-between items-center py-1 px-5 md:px-16'>

                <div className='text-black sm:font-semibold text-sm md:font-medium'>©2023 Book A Place.com </div>

                <div className='text-black/70 flex gap-3 md:gap-6 text-sm md:font-medium'>

                    <Link><FacebookIcon /></Link>
                    <Link><InstagramIcon /></Link>

                </div>

            </div>

        </>
    )
}

export default Footer