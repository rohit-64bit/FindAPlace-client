import React, { useState } from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useLocation } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Modal } from '@mui/material';

const ViewProperty = () => {

    const locationRoute = useLocation()

    const { title, description, location, images, cost, RatingScore, typeName } = locationRoute.state.data

    const [imageLink, setImageLink] = useState(images[0])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 6);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <div className='w-full py-5 xl:py-10 lg:h-[87vh] flex flex-col lg:flex-row lg:px-16 xl:px-28'>

                <div className='lg:w-[30%] h-max'>

                    <div className='flex flex-col px-4 md:px-10 lg:px-0 lg:py-14 xl:py-10 gap-5 justify-start duration-300'>

                        <div className='w-full md:w-[350px] lg:w-[260px] xl:w-[350px]'>
                            <img className='rounded-2xl w-full h-[280px] md:w-[350px] md:h-[350px] lg:w-[260px] lg:h-[260px] xl:w-[350px] xl:h-[350px] object-cover shadow-md' src={imageLink} alt="image" />
                        </div>

                        <div className='flex gap-3 w-[280px] md:w-[350px] lg:w-[260px] xl:w-[350px]'>

                            {
                                images?.map((data) => {
                                    return (
                                        <button
                                            onClick={e => setImageLink(data)}
                                            key={data}
                                            className={imageLink === data ? 'xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] duration-300 opacity-100' : 'xl:w-[80px] lg:w-[80px] w-[65px] sm:w-[75px] md:w-[80px] duration-300 opacity-50 hover:opacity-100'
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

                                    {typeName}

                                </div>

                            </div>

                            <div className='flex flex-col gap-2 h-full'>

                                <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center'>

                                    <div>
                                        {RatingScore}
                                    </div>

                                    <StarIcon fontSize='' />

                                </div>

                            </div>

                        </div>

                        <div className='text-slate-500'>
                            {description}
                        </div>

                        <div>
                            <div className='text-slate-500 px-1'>
                                Available
                            </div>
                            <div className='text-slate-500 flex gap-1'>
                                <EventAvailableIcon />
                                <div>01 May 2023</div>
                            </div>
                        </div>

                        <div className='text-xl font-semibold'>
                            {cost}
                        </div>

                        <button
                            onClick={handleOpen}
                            className='bg-[#166534] text-sm text-white px-8 py-1.5 font-semibold hover:shadow-md duration-300 w-max'
                        >
                            RENT PLACE
                        </button>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className='flex items-center justify-center'
                        >

                            <div className='p-5 w-[90%] md:w-[50%] xl:w-[40%] 2xl:w-[30%] bg-white rounded'>

                                <div className='flex justify-between gap-3 flex-col'>

                                    Confirm Booking

                                    <form action="" method="post" className='flex flex-col gap-2'>

                                        <input
                                            type="date"
                                            pattern='[0-9]'
                                            required
                                            className='p-2 outline outline-2 outline-slate-300 focus:outline-slate-500 duration-300 transition-all ease-in-out rounded'
                                            min={formatDate(today)}
                                            max={formatDate(maxDate)}
                                        />

                                        <button
                                            className='w-full text-center bg-slate-300 hover:bg-slate-500 hover:text-white duration-300 transition-all ease-in-out py-2 rounded'
                                            type='submit'
                                        >
                                            CONFIRM
                                        </button>

                                    </form>

                                </div>

                            </div>

                        </Modal>

                    </div>

                </div>

            </div>
        </>
    )
}

export default ViewProperty