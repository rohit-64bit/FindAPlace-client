import React from 'react'
import { Link } from 'react-router-dom'
import SignupImage from '../assets/Image/signup2.png'

const SignUp = () => {
    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300 py-'>
                <div className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-black/60 lg:bg-white h-full justify-center py-5'>
                    <div className='lg:text-3xl text-xl text-[#4DD637] font-semibold px-2'>Create New Account</div>
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Full Name' />
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Email' />
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Contact' />
                    <textarea className='px-5 py-2 rounded-lg outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' placeholder='Enter Full Address' name="" id="" cols="30" rows="5"></textarea>
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="password" placeholder='Enter Password' />
                    <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="password" placeholder='Repeat Password' />
                    <div className='gap-1 flex flex-col'>
                        <div className='flex gap-2 px-5'>
                            <input type="checkbox" />
                            <div className='text-[#4DD637] text-sm'>Looking for Place</div>
                        </div>
                        <div className='flex gap-2 px-5'>
                            <input type="checkbox" />
                            <div className='text-[#4DD637] text-sm'>Want to List My Property</div>
                        </div>
                    </div>
                    <Link>
                        <button className='bg-[#4DD637] text-white w-full px-5 py-1.5 rounded-full font-semibold text-lg hover:shadow-lg duration-300 '>Login</button>
                    </Link>
                </div>

                <div className='lg:w-[50%] w-full flex lg:justify-center md:justify-end items-center lg:items-end h-full'>
                    <img className='md:w-[60%] lg:w-[70%] w-full' src={SignupImage} alt="Image" />
                </div>
            </div>
        </>
    )
}

export default SignUp