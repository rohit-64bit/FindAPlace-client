import React, { useContext, useEffect, useState } from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Modal, Avatar, Divider, Button } from '@mui/material';
import Fade from '@mui/material/Fade';
import PropertyReview from '../components/PropertyReview';
import { SERVER_URL } from './../services/helper';
import MainContext from './../context/MainContext';

import CircularProgress from '@mui/material/CircularProgress';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import moment from 'moment';

const ViewProperty = () => {

    const authToken = localStorage.getItem('auth-token');

    const { setNotification } = useContext(MainContext)

    const navigate = useNavigate()

    const locationRoute = useLocation()

    const params = useParams()

    const { propertyID } = params

    const [propertyData, setPropertyData] = useState({})

    const [imageLink, setImageLink] = useState('')

    const [loader, setLoader] = useState(false)

    const fetchPropertyDetails = () => {

        setLoader(true)

        fetch(`${SERVER_URL}property/fetch-property-details/${propertyID}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {
                    setPropertyData(json.data)
                    setImageLink(json.data.images[0])
                    fetchReview(json.data._id)
                    fetchHostData(json.data.owner)
                    fetchPropertyType(json.data.type)
                    setLoader(false)
                }

            })

    }

    const { _id, title, description, location, images, cost, RatingScore, type, owner, totalReviews } = propertyData;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 6);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [checkLoading, setCheckLoading] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)
    const [isUnAvailable, setIsUnAvailable] = useState(false)

    const handleCheckAvailability = async (e) => {
        e.preventDefault()
        setCheckLoading(true)
        setIsAvailable(false)
        setIsUnAvailable(false)
        const response = await fetch(`${SERVER_URL}booking/check-availability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ propertyID: _id, startDate: startDate, endDate: endDate })
        })
        const json = await response.json()

        if (json.success && json.available) {

            setIsAvailable(true)
            setIsUnAvailable(false)
            setCheckLoading(false)

        } else if (json.success && !json.available) {

            setNotification({ status: 'true', message: `${json.message}`, type: 'info' })
            setIsAvailable(false)
            setIsUnAvailable(true)
            setCheckLoading(false)

        } else {

            setNotification({ status: 'true', message: `${json.error}`, type: 'error' })
            setIsAvailable(false)
            setCheckLoading(false)
            setIsUnAvailable(false)

        }

    }

    const handleCreateBooking = async () => {

        const response = await fetch(`${SERVER_URL}booking/create-booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ propertyID: _id, startDate: startDate, endDate: endDate })
        })

        const json = await response.json()

        if (json.success && json.available) {

            setNotification({ status: 'true', message: `${json.message}`, type: 'success' })
            navigate('/order')
            setIsAvailable(true)
            setIsUnAvailable(false)
            setCheckLoading(false)

        } else if (json.success && !json.available) {

            setNotification({ status: 'true', message: `${json.message}`, type: 'info' })
            setIsAvailable(false)
            setIsUnAvailable(true)
            setCheckLoading(false)

        } else {

            setNotification({ status: 'true', message: `${json.error}`, type: 'error' })
            setIsAvailable(false)
            setCheckLoading(false)
            setIsUnAvailable(false)

        }

    }

    const [propertyType, setPropertyType] = useState({})

    const fetchPropertyType = async (type) => {

        const response = await fetch(`${SERVER_URL}property-type/fetch-data/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const json = await response.json()
        if (json.success) {
            setPropertyType(json.data)
        }
    }

    const [hostData, setHostData] = useState({})

    const fetchHostData = async (owner) => {

        const response = await fetch(`${SERVER_URL}user/user-profile/${owner}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (json.success) {
            setHostData(json.user)
        } else {
            console.error(json);
        }

    }

    const [review, setReview] = useState([])

    const fetchReview = async (propertyID) => {

        const response = await fetch(`${SERVER_URL}review/fetch/${propertyID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (json.success) {
            setReview(json.data)
        } else {
            console.error(json);
        }

    }

    useEffect(() => {

        if (propertyID) {
            fetchPropertyDetails();
        }

    }, [])

    return (
        <>

            {!loader ?
                <>

                    <div className='w-full py-5 h-max xl:py-10 flex flex-col lg:flex-row lg:px-16 xl:px-28'>

                        <div className='lg:w-[30%] h-max'>

                            <div className='flex flex-col px-4 md:px-10 lg:px-0 lg:py-14 xl:py-10 gap-5 justify-start duration-300'>

                                <div className='w-full md:w-[350px] lg:w-[260px] xl:w-[350px]'>

                                    <img className='rounded-2xl w-full h-[280px] md:w-[350px] md:h-[350px] lg:w-[260px] lg:h-[260px] xl:w-[350px] xl:h-[350px] object-cover shadow-md' src={imageLink} alt="image" />

                                </div>

                                <div className='flex gap-2 w-full md:w-[350px] lg:w-[260px] xl:w-[350px]'>

                                    {
                                        images?.map((data) => {
                                            return (
                                                <button
                                                    onClick={e => setImageLink(data)}
                                                    key={data}
                                                    className={imageLink === data ?
                                                        'xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] xl:h-[80px] lg:h-[80px] h-[65px] sm:h-[75px] md:h-[80px] duration-300 opacity-100' :
                                                        'xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] xl:h-[80px] lg:h-[80px] h-[65px] sm:h-[75px] md:h-[80px] duration-300 opacity-50 hover:opacity-100'
                                                    }
                                                >
                                                    <img className='rounded-md shadow-md w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] md:h-[80px] md:w-[80px] xl:h-[80px] lg:h-[80px] lg:w-[80px] xl:w-[80px] object-cover' src={data} alt="image" />
                                                </button>
                                            )
                                        })
                                    }

                                </div>

                            </div>

                        </div>

                        <div className='lg:w-[70%] h-full'>

                            <div className='flex flex-col py-10 gap-3 lg:gap-4 xl:gap-5 px-4 md:px-10'>

                                <div className='text-3xl font-bold'>
                                    {title}
                                </div>

                                <div className="flex flex-col gap-2 w-max">

                                    <div className="h-full">

                                        <div className="text-sm text-gray-500">

                                            {location}

                                        </div>

                                        <div className="text-sm text-gray-500">

                                            {propertyType.type}

                                        </div>

                                    </div>

                                    <div className='flex flex-col gap-2 h-full'>

                                        <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center'>

                                            <div>
                                                {RatingScore / totalReviews > 0 ? RatingScore / totalReviews : 0}
                                            </div>

                                            <StarIcon fontSize='' />

                                        </div>

                                    </div>

                                </div>

                                <div className='text-slate-500'>
                                    {description}
                                </div>

                                <div className='text-xl font-semibold'>
                                    $ {cost}
                                </div>

                                <form onSubmit={handleCheckAvailability} method='POST' className='shadow-lg shadow-slate-200 p-5 flex flex-col gap-2 border w-full sm:w-max'>

                                    <div className="flex flex-col gap-1 w-full">

                                        <div className="flex w-full">
                                            <label htmlFor='fromDate' className='w-full m-auto text-sm opacity-50'>
                                                From
                                            </label>
                                            <label htmlFor='toDate' className='w-full m-auto text-sm opacity-50'>
                                                To
                                            </label>
                                        </div>

                                        <div className="flex w-full">

                                            <input
                                                id='fromDate'
                                                type="date"
                                                className='py-1.5 px-1 md:px-3 rounded-l-lg bg-slate-100 outline outline-1 outline-slate-300 w-full'
                                                required
                                                min={formatDate(today)}
                                                max={formatDate(maxDate)}
                                                value={startDate}
                                                onChange={e => setStartDate(e.target.value)}
                                                placeholder='From'
                                            />

                                            <input
                                                id='toDate'
                                                type="date"
                                                className='py-1.5 px-1 md:px-3 rounded-r-lg bg-slate-100 outline outline-1 outline-slate-300 w-full'
                                                required
                                                min={formatDate(tomorrow)}
                                                max={formatDate(maxDate)}
                                                value={endDate}
                                                onChange={e => setEndDate(e.target.value)}
                                                placeholder='To'
                                            />

                                        </div>

                                    </div>

                                    {checkLoading && (
                                        <Fade in={checkLoading}>
                                            <div className='flex flex-col gap-2 w-full items-center py-2'>
                                                <CircularProgress size={20} color='success' />
                                            </div>
                                        </Fade>
                                    )}

                                    {isAvailable && (
                                        <Fade in={isAvailable}>
                                            <div className='flex flex-col gap-2 w-full items-center py-2'>
                                                <div><WhereToVoteIcon sx={{
                                                    width: 70,
                                                    height: 70,
                                                }} className='text-green-500' /></div>
                                                <div className='text-sm md:text-base'>This property is available for this times.</div>

                                                {authToken ? <button onClick={handleCreateBooking} type='button' className='py-2 px-10 rounded h-max bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white w-full duration-300 outline outline-1 outline-slate-300 hover:outline-green-500'>Book Now</button> :
                                                    <Link to='/login' className='py-2 px-10 rounded h-max bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white w-full duration-300 outline outline-1 outline-slate-300 hover:outline-green-500 text-center'>Login</Link>}


                                            </div>
                                        </Fade>
                                    )}

                                    {isUnAvailable && (
                                        <Fade in={isUnAvailable}>
                                            <div className='flex flex-col gap-2 w-full items-center py-2'>
                                                <div><FmdBadIcon sx={{
                                                    width: 70,
                                                    height: 70,
                                                }} className='text-red-500' /></div>
                                                <div className='text-sm md:text-base'>Opps! property is unavailable for this times.</div>
                                            </div>
                                        </Fade>
                                    )}

                                    <button className={isAvailable ? 'py-2 px-10 rounded h-max  text-black w-full duration-300 outline outline-1 outline-slate-300  hover:outline-green-500' : 'py-2 px-10 rounded h-max bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white w-full duration-300 outline outline-1 outline-slate-300 hover:outline-green-500'}>
                                        Check Availability
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div className='border mx-5 md:mx-10 my-5 h-max xl:my-10 lg:mx-16 xl:mx-28' />

                    <div className='w-full px-5 md:px-10 py-5 h-max xl:py-10 flex flex-col lg:px-16 xl:px-28'>

                        <div className='w-full flex items-center justify-between'>

                            <div className="flex gap-2 md:gap-4 items-center">

                                <Avatar sx={{
                                    width: 50,
                                    height: 50,
                                    '@media (max-width:800px)': {
                                        width: 40,
                                        height: 40,
                                    },
                                    '@media (min-width:801px) and (max-width:960px)': {
                                        width: 60,
                                        height: 60,
                                    }
                                }} src='' />

                                <div className="flex flex-col">

                                    <div className="text-sm md:text-base font-bold">
                                        Hosted by {hostData?.name?.split(' ')[0]}
                                    </div>

                                    <div className="text-xs md:text-sm text-black/50">
                                        Joined on {moment(hostData.joinedOn).format('MMM DD YYYY')}
                                    </div>

                                </div>
                            </div>

                            {/* {
        authToken && (
            <button className='text-sm bg-slate-100 py-2 px-5 md:px-10 rounded h-max hover:bg-gradient-to-tr hover:from-green-500 hover:to-[#166534]/90 hover:text-white duration-300 transition-all ease-in-out'>Contact Host</button>
        )
    } */}

                        </div>

                        <div className='flex flex-col w-full'>

                            <div className='my-10 md:my-16 font-bold text-lg'>Reviews</div>

                            <div className='flex flex-col gap-5 w-full'>

                                {

                                    review.length ?

                                        review?.map((data) => {
                                            return (
                                                <PropertyReview key={data._id} data={data} refresh={fetchReview} />
                                            )
                                        })
                                        :
                                        <div className='text-center py-10'>
                                            No reviews found
                                        </div>

                                }

                            </div>

                        </div>

                    </div>
                </>
                :
                <>
                    <div className='w-full py-5 h-max xl:py-10 flex flex-col lg:flex-row lg:px-16 xl:px-28'>

                        <div className='lg:w-[30%] h-max'>

                            <div className='flex flex-col px-4 md:px-10 lg:px-0 lg:py-14 xl:py-10 gap-5 justify-start duration-300'>

                                <div className='rounded-2xl w-full h-[280px] md:w-[350px] md:h-[350px] lg:w-[260px] lg:h-[260px] xl:w-[350px] xl:h-[350px] bg-slate-200 animate-pulse'>
                                </div>

                            </div>

                        </div>

                        <div className='lg:w-[30%] h-full'>

                            <div className='flex flex-col py-10 gap-3 lg:gap-4 xl:gap-5 px-4 md:px-10'>

                                <div className='text-3xl font-bold bg-slate-200 animate-pulse py-4 rounded-lg'>
                                </div>

                                <div className="flex flex-col gap-2 w-[30%]">

                                    <div className="h-full flex flex-col gap-2 w-full">

                                        <div className="text-sm text-gray-500 bg-slate-200 animate-pulse py-2 rounded-lg">
                                        </div>

                                        <div className="text-sm text-gray-500 bg-slate-200 animate-pulse py-2 rounded-lg">
                                        </div>

                                    </div>

                                    <div className='flex flex-col gap-2 h-full'>

                                        <div className='text-white text-sm w-max px-1.5 py-0.5 bg-slate-200 animate-pulse rounded-md flex items-center'>

                                            <div>
                                                0
                                            </div>

                                            <StarIcon fontSize='' />

                                        </div>

                                    </div>

                                </div>

                                <div className='text-slate-500 bg-slate-200 animate-pulse py-1 rounded-lg'>
                                </div>

                                <div className='text-xl font-semibold bg-slate-200 animate-pulse py-1 rounded-lg'>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }


        </>
    )
}

export default ViewProperty