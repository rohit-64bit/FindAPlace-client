import React from 'react'
import { Link } from 'react-router-dom'
import LoginImage from '../assets/Image/loginImage2.png'

const Login = () => {
    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300'>
                <div className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-black/60 lg:bg-white h-full justify-center'>
                    <div className='text-3xl text-[#4DD637] font-semibold px-2'>Login</div>
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100' type="text" placeholder='Email' />
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100' type="password" placeholder='Enter Password' />
                    <div className='flex gap-2 px-5'>
                        <input type="checkbox" />
                        <div className='text-[#4DD637]'>Remember Me</div>
                    </div>
                    <Link>
                        <button className='bg-[#4DD637] text-white w-full px-5 py-1.5 rounded-full font-semibold text-lg hover:shadow-lg duration-300 '>Login</button>
                    </Link>
                </div>

                <div className='lg:w-[50%] w-full flex lg:justify-center md:justify-end items-center h-full lg:items-end'>
                    <img className='md:w-[60%] lg:w-[90%] w-full' src={LoginImage} alt="Image" />
                </div>
            </div>
        </>
    )
}

export default Login