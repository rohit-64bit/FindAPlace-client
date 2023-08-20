import React, { useEffect, useState } from 'react'
import Hero from '../assets/Image/hero.svg'
import Items from '../components/Items'
import Review from '../components/Review'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../services/helper'

const Home = () => {

    const [topPropertyData, setTopPropertyData] = useState([])

    const fetchTopProperty = () => {

        fetch(`${SERVER_URL}property/fetch-top-property`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setTopPropertyData(json.data?.slice(0, 4)))

    }

    useEffect(() => {

        fetchTopProperty()

    }, [])

    return (
        <>
            <div className='w-full flex lg:justify-between px-4 lg:px-10 h-[80vh] duration-300 items-center'>

                <div className='flex justify-center flex-col gap-5 px-[7%] relative'>

                    <div className='text-[#166534] text-2xl lg:text-4xl font-semibold'>A PLACE OF YOUR CHOICE</div>

                    <div className='text-[#166534] lg:font-semibold lg:text-lg'>The perfect site to book place of your choice or to rent your vacant place and earn</div>

                    <div className='gap-3 lg:gap-5 flex'>

                        <Link to='/property' className='border-2 border-[#166534] bg-[#166534] text-white py-1 px-2 lg:py-1.5 lg:px-6 font-semibold text-sm hover:shadow-md duration-300'>BOOK PLACE</Link>

                        <Link to='/listproperty' className='border-2 border-[#166534] text-[#166534] py-1 px-2 lg:py-1.5 lg:px-6 font-semibold text-sm hover:shadow-md duration-300'>LIST PLACE</Link>

                    </div>

                </div>

                <div className='lg:w-[50%] w-full hidden sm:flex md:justify-center'>
                    <img className='w-auto md:w-[50%] lg:w-[70%]' src={Hero} alt="Image" />
                </div>

            </div>

            <div className='bg-white flex justify-center flex-col py-4 lg:py-5 w-full'>

                <div className='text-[#166534] text-lg font-semibold flex justify-center w-full cursor-default'>TOP RATED PLACE</div>

                <div className='grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 lg:px-5 py-5'>

                    {
                        topPropertyData?.map((data) => {
                            return (
                                <Items key={data._id} data={data} />
                            )
                        })
                    }

                </div>

            </div>

            <div className='bg-white flex justify-center flex-col w-full py-4 lg:py-5'>

                <div className='text-[#166534] text-lg font-semibold flex justify-center cursor-default'>CUSTOMER REVIEWS</div>

                <div className='grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 lg:px-5 py-5'>

                    <Review />
                    <Review />
                    <Review />
                    <Review />

                </div>

            </div>

            <div className='bg-[#F7F7F7] py-8 lg:py-10 flex flex-col items-center justify-center md:h-[70vh]'>

                <div className='text-[#166534] text-lg font-semibold flex justify-center py-5 cursor-default'>CONTACT US</div>

                <form method='POST' className='flex flex-col items-center gap-5 w-full px-4 md:px-10'>

                    <div className='flex flex-col md:flex-row gap-5 w-full lg:w-[40%] duration-300'>

                        <input required className='px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full rounded-md' type="text" placeholder='Name' />

                        <input required className='px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full rounded-md' type="email" placeholder='Email' />

                    </div>

                    <textarea required className='lg:w-[40%] rounded-md px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full' placeholder='Message' name="" id="" cols="30" rows="7"></textarea>

                    <button type='submit' className=' text-white bg-[#166534] lg:w-[15%] py-1.5 rounded-lg duration-300 w-full'>SUBMIT</button>

                </form>

            </div>

            <div className='bg-white flex justify-center py-10 w-full md:h-[50vh] flex-col items-center cursor-default'>

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