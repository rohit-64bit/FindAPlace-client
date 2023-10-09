import React, { useContext, useEffect, useState } from 'react'
import Hero from '../assets/Image/hero.svg'
import Items from '../components/Items'
import Review from '../components/Review'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../services/helper'
import MainContext from '../context/MainContext'

const Home = () => {

    const { contactLoader,
        handleContact, userProfile } = useContext(MainContext)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        const data = {
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            type: 'contact'
        }

        handleContact(data)

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        })

    }

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

    const [reviews, setReviews] = useState([])

    const fetchReviews = () => {

        fetch(`${SERVER_URL}review/fetch-all`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setReviews(json.data))

    }

    useEffect(() => {

        fetchTopProperty()
        fetchReviews()

    }, [])

    return (
        <>
            <div className='w-full flex justify-between px-4 gap-10 py-10 lg:px-10 mb-10 h-[70vh] duration-300 items-center'>

                <div className='flex justify-center flex-col gap-5 px-[7%]'>

                    <div className=' text-2xl lg:text-4xl font-semibold text-green-600'>Find the <span className='text-[#166534]'>destination</span> of your choice.</div>

                    <div className='text-black lg:text-lg'>The perfect site to book place of your choice or to rent your vacant place and earn</div>

                    <Link to='/property' className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-max text-white rounded'>Explore properties</Link>

                </div>
                <img className='w-full sm:w-[50%] lg:w-[500px] hidden sm:flex p-[7%]' src={Hero} alt="Image" />

            </div>

            {
                topPropertyData.length > 0 &&
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

                    <Link to='/property' className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-max text-white rounded m-auto'>View More</Link>

                </div>
            }

            <div className='bg-white flex justify-center flex-col w-full py-4 lg:py-5'>

                <div className='text-[#166534] text-lg font-semibold flex justify-center cursor-default'>CUSTOMER REVIEWS</div>

                <div className='grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 lg:px-5 py-5'>

                    {reviews?.map((data) => {
                        return (
                            <Review key={data._id} data={data} />
                        )
                    })}

                </div>

            </div>

            <div className='bg-[#F7F7F7] py-8 lg:py-10 flex flex-col items-center justify-center md:h-[70vh]'>

                <div className='text-[#166534] text-lg font-semibold flex justify-center py-5 cursor-default'>CONTACT US</div>

                <form method='POST' onSubmit={handleFormSubmit} className='flex flex-col items-center gap-5 w-full px-4 md:px-10'>

                    <div className='flex flex-col md:flex-row gap-5 w-full lg:w-[40%] duration-300'>

                        <input required className='px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full rounded-md' type="text" placeholder='Name' name='name' value={formData.name} onChange={onChange} />

                        <input required className='px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full rounded-md' type="email" placeholder='Email' name='email' value={formData.email} onChange={onChange} />

                    </div>

                    <input required className='lg:w-[40%] rounded-md px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full' type="text" placeholder='Subject' name='subject' value={formData.subject} onChange={onChange} />

                    <textarea required className='lg:w-[40%] rounded-md px-5 py-2 outline outline-1 outline-slate-300 focus:outline-[#166534] duration-300 w-full' placeholder='Message' name='message' value={formData.message} onChange={onChange} id="" cols="30" rows="7"></textarea>

                    <button type='submit' disabled={contactLoader} className=' text-white bg-[#166534] lg:w-[15%] py-1.5 rounded-lg duration-300 w-full'>
                        {contactLoader ? 'Sending...' : 'SUBMIT'}
                    </button>

                </form>

            </div>

            <div className='bg-white flex justify-center py-10 w-full md:h-[50vh] flex-col items-center cursor-default'>

                <div className='p-5 flex flex-col items-center w-full md:w-[75%] lg:w-[25%]'>

                    <div className='flex text-center py-3 font-semibold text-black/60'>" Discover the best place with ease at ProxiPlays.com – where unforgettable getaways begin. "</div>

                    {/* <div className='text-black font-bold text-lg'>OWNER NAME</div> */}

                    <div className='text-black/30 font-semibold'>Owner</div>

                </div>

            </div>

        </>
    )
}

export default Home