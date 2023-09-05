import React, { useContext, useEffect, useState } from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import { SERVER_URL } from '../services/helper';
import MainContext from '../context/MainContext';
import { Modal, Rating } from '@mui/material';

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

        }

    }

    const { title, description, location, cost, RatingScore, images } = propertyDetails;

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

    useEffect(() => {
        fetchPropertyDetails()
    }, [])

    return (

        <>

            <div className='border border-white hover:border-slate-200 rounded-lg flex flex-col sm:flex-row gap-2 md:gap-5 justify-between hover:shadow-md p-5 duration-300'>

                <div className='flex flex-col w-full sm:flex-row gap-5'>

                    <img
                        src={propertyDetails.images ? images[0] : ''}
                        alt="image"
                        className='h-60 sm:w-40 sm:h-40 rounded-lg object-cover'
                    />

                    <div className='flex flex-col gap-2 justify-between'>

                        <div className='text-lg lg:text-3xl font-bold'>
                            {title}
                        </div>

                        <div className="flex flex-col gap-2 w-max">

                            <div className="h-full">

                                <div className="text-xs md:text-sm text-gray-500">

                                    {location}

                                </div>

                                <div className="text-xs md:text-sm text-gray-500">

                                    typeName

                                </div>

                            </div>

                            <div className='flex flex-col gap-2 h-full'>

                                <div className='text-white text-xs md:text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center'>

                                    <div>
                                        {RatingScore}
                                    </div>

                                    <StarIcon fontSize='' />

                                </div>

                            </div>

                        </div>

                        <div className='text-slate-500'>
                            {description?.slice(0, 800)}
                        </div>

                    </div>

                </div>

                <div className='w-full sm:w-max place-self-auto flex flex-col justify-between gap-5 sm:gap-0'>

                    <div className='w-full'>

                        <div className='text-slate-500 px-1'>
                            Status : {status}
                        </div>

                        <div className='text-slate-500 flex gap-1'>
                            <EventAvailableIcon />
                            <div>01 May 2023</div>
                        </div>

                        <div className='text-xl font-semibold'>
                            $ {cost}
                        </div>

                    </div>

                    {!isCanceled && status != "complete" ?
                        <button onClick={handleOrderCancel} className='md:bg-slate-50 px-5 py-1 md:hover:bg-slate-600 md:hover:text-white rounded-md ring-1 ring-slate-200 md:ring-slate-600 md:duration-300 transition-all ease-in-out active:bg-slate-200'>
                            Cancel Booking
                        </button>
                        :
                        <button onClick={handleOpen} className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-full text-white rounded'>
                            Review
                        </button>
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

                            <form className='flex flex-col gap-3 mt-3'>

                                <div className='flex flex-col gap-1'>

                                    <label htmlFor="rating" className='text-sm'>Rating</label>
                                    <Rating name="half-rating" defaultValue={3.5} precision={0.5} aria-required />

                                </div>

                                <div className='flex flex-col gap-1'>

                                    <label htmlFor="feedback" className='text-sm'>Feedback</label>

                                    <input type="text" id='feedback' className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-md lg:focus:shadow-md duration-300 lg:bg-gray-200/50 bg-gray-100' required />

                                </div>

                                <div className='flex flex-col gap-1'>

                                    <label htmlFor="description" className='text-sm'>What do you think ?</label>

                                    <textarea rows={5} id='description' type="text" className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-md lg:focus:shadow-md duration-300 lg:bg-gray-200/50 bg-gray-100' required />

                                </div>

                                <button type="submit" className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-3'>Submit</button>

                            </form>

                        </div>
                    </Modal>

                </div>

            </div>

        </>
    )
}

export default OrderDetails