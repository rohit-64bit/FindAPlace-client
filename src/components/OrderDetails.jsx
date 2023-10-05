import React, { useContext, useEffect, useState } from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import { SERVER_URL } from '../services/helper';
import MainContext from '../context/MainContext';
import { Modal, Rating } from '@mui/material';
import moment from 'moment';

const OrderDetails = (props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const authToken = localStorage.getItem('auth-token')

    const { _id, propertyID, startDate, endDate, status, isCanceled } = props.data;

    const { fetchOrder, setNotification } = useContext(MainContext)

    const [propertyDetails, setPropertyDetails] = useState({})

    const fetchPropertyDetails = async () => {

        const response = await fetch(`${SERVER_URL}property/fetch-property-details/${propertyID}`)

        const json = await response.json()

        if (json.success) {

            setPropertyDetails(json.data)

        } else {
            console.error(json)
        }

    }

    const handleOrderCancel = async () => {

        const response = await fetch(`${SERVER_URL}booking/cancel-booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                bookingID: _id
            })
        })

        const json = await response.json()

        if (json.success) {

            fetchOrder()

            setNotification({
                type: 'success',
                message: `${json.message}`,
                status: 'true'
            })

        }


    }

    const [reviewFormData, setReviewFormData] = useState({
        bookingID: _id,
        rating: 3.5,
        comment: '',
        description: ''
    })

    const handleReviewFromChange = (e) => {

        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value })

    }

    const handleAddReview = async (e) => {

        e.preventDefault()

        const response = await fetch(`${SERVER_URL}review/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(reviewFormData)
        })

        const json = await response.json()

        if (json.success) {

            setReviewFormData({
                bookingID: '',
                rating: 3.5,
                comment: '',
                description: ''
            })

            setNotification({
                type: 'success',
                message: `${json.message}`,
                status: 'true'
            })

            fetchPropertyDetails()
            handleClose()

        } else {

            setNotification({
                type: 'error',
                message: `${json.error}`,
                status: 'true'
            })

        }

    }

    const calculateTotalDays = (date1, date2) => {

        const startDate = new Date(date1);
        const endDate = new Date(date2);

        const timeDifference = endDate - startDate;

        const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return totalDays;

    }

    const totalDays = calculateTotalDays(startDate, endDate);

    useEffect(() => {
        fetchPropertyDetails()
    }, [])

    return (

        <>

            {
                propertyDetails?.title ?
                    <>
                        <div className='border border-white hover:border-slate-200 rounded-lg flex flex-col sm:flex-row gap-2 md:gap-5 justify-between hover:shadow-md p-5 duration-300'>

                            <div className='flex flex-col w-full sm:flex-row gap-5'>

                                <img
                                    src={propertyDetails?.images ? propertyDetails.images[0] : ''}
                                    alt="image"
                                    className='h-60 sm:w-40 sm:h-40 rounded-lg object-cover'
                                />

                                <div className='flex flex-col gap-2 justify-between'>

                                    <div className='text-lg lg:text-3xl font-bold'>
                                        {propertyDetails?.title}
                                    </div>

                                    <div className="flex flex-col gap-2 w-max">

                                        <div className="h-full">

                                            <div className="text-xs md:text-sm text-gray-500">

                                                {propertyDetails?.location}

                                            </div>

                                        </div>

                                        <div className='flex flex-col gap-2 h-full'>

                                            <div className='text-white text-xs md:text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center'>

                                                <div>
                                                    {propertyDetails?.RatingScore / propertyDetails?.totalReviews > 0 ? propertyDetails?.RatingScore / propertyDetails?.totalReviews : 0}
                                                </div>

                                                <StarIcon fontSize='' />

                                            </div>

                                        </div>

                                    </div>

                                    <div className='text-slate-500'>
                                        {propertyDetails?.description?.slice(0, 800)}
                                    </div>

                                </div>

                            </div>

                            <div className='w-full sm:w-max place-self-auto flex flex-col justify-between gap-5 sm:gap-0'>

                                <div className='w-full'>

                                    <div className='text-slate-500'>
                                        Status : {status}
                                    </div>

                                    <div className='text-slate-500 flex gap-1'>
                                        <p>From : </p>
                                        <div>{moment(startDate).format('MMM DD YYYY')}</div>
                                    </div>

                                    <div className='text-slate-500 flex gap-1'>
                                        <p>To : </p>
                                        <div>{moment(endDate).format('MMM DD YYYY')}</div>
                                    </div>

                                    <div className='text-xl font-semibold'>
                                        $ {totalDays * propertyDetails?.cost}
                                    </div>

                                </div>

                                {!isCanceled && status != "complete" ?

                                    <button onClick={handleOrderCancel} className='md:bg-slate-50 px-5 py-1 md:hover:bg-slate-600 md:hover:text-white rounded-md ring-1 ring-slate-200 md:ring-slate-600 md:duration-300 transition-all ease-in-out active:bg-slate-200'>
                                        Cancel Booking
                                    </button>

                                    : !isCanceled && status == "complete" ?

                                        <button onClick={handleOpen} className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-full text-white rounded'>
                                            Review
                                        </button> : null

                                }

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="parent-modal-title"
                                    aria-describedby="parent-modal-description"
                                    className='flex justify-center items-center'
                                >
                                    <div className='p-7 bg-white rounded-md shadow-lg w-[95%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%]'>

                                        <div className='text-lg'>Your feedback matters</div>

                                        <form onSubmit={handleAddReview} className='flex flex-col gap-3 mt-3'>

                                            <div className='flex flex-col gap-1'>

                                                <label htmlFor="rating" className='text-sm'>Rating</label>
                                                <Rating name="rating" onChange={handleReviewFromChange} value={reviewFormData.rating} defaultValue={3.5} precision={0.5} aria-required />

                                            </div>

                                            <div className='flex flex-col gap-1'>

                                                <label htmlFor="feedback" className='text-sm'>Feedback</label>

                                                <input type="text" id='feedback' name='comment' value={reviewFormData.comment} onChange={handleReviewFromChange} className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-md lg:focus:shadow-md duration-300 lg:bg-gray-200/50 bg-gray-100' required placeholder='write your comment' />

                                            </div>

                                            <div className='flex flex-col gap-1'>

                                                <label htmlFor="description" className='text-sm'>What do you think ?</label>

                                                <textarea rows={5} id='description' name='description' value={reviewFormData.description} onChange={handleReviewFromChange} type="text" className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-md lg:focus:shadow-md duration-300 lg:bg-gray-200/50 bg-gray-100' required />

                                            </div>

                                            <button type="submit" disabled={reviewFormData.comment && reviewFormData.rating ? false : true} className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-3 disabled:bg-slate-300 disabled:text-black disabled:cursor-not-allowed'>Submit</button>

                                        </form>

                                    </div>
                                </Modal>

                            </div>

                        </div>
                    </>
                    :
                    null
            }

        </>
    )
}

export default OrderDetails