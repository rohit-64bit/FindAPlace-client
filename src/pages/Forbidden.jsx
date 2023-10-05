import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../assets/Image/notFound.svg'

const Forbidden = () => {
    return (
        <div className='h-[70vh] flex'>

            <div className="m-auto flex flex-col gap-6 p-20 items-center justify-center">

                <img src={notFound} alt="" className='w-full sm:w-[30%]' />

                <div className='font-bold'>Opps! page not found.</div>

                <Link to='/' className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-max text-white rounded'>Return Home</Link>

            </div>

        </div>
    )
}

export default Forbidden