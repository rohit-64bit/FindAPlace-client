import React from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';

const OrderDetails = () => {
    
    return (

        <div className='border-2 rounded flex flex-col sm:flex-row gap-5 justify-between shadow-lg hover:shadow-xl p-5 duration-300 '>

            <div className='flex flex-col sm:flex-row gap-5'>

                <img
                    src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202305/taj_hotels-cq5dam.web_.756.756-sixteen_nine.jpeg?VersionId=qUqCAQOi5SkB1meNnLf4hdsrtRPLnNvA"
                    alt="image"
                    className='sm:w-40 h-40 rounded-lg object-cover'
                />

                <div className='flex flex-col justify-between'>
                    <div className='text-3xl font-bold'>
                        Title
                    </div>

                    <div className="flex flex-col gap-2 w-max">

                        <div className="h-full">

                            <div className="text-sm text-gray-500">

                                location

                            </div>

                            <div className="text-sm text-gray-500">

                                typeName

                            </div>

                        </div>

                        <div className='flex flex-col gap-2 h-full'>

                            <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center'>

                                <div>
                                    0.0
                                </div>

                                <StarIcon fontSize='' />

                            </div>

                        </div>

                    </div>

                    <div className='text-slate-500'>
                        description
                    </div>

                </div>

            </div>

            <div className=' flex flex-col justify-between gap-5 sm:gap-0'>

                <div>

                    <div className='text-slate-500 px-1'>
                        Status : Waiting
                    </div>

                    <div className='text-slate-500 flex gap-1'>
                        <EventAvailableIcon />
                        <div>01 May 2023</div>
                    </div>

                    <div className='text-xl font-semibold'>
                        $ 220
                    </div>

                </div>

                <button className='bg-slate-50 px-5 py-1 hover:bg-slate-600 hover:text-white rounded-md ring-1 ring-slate-600 duration-300 transition-all ease-in-out'>CANCEL</button>

            </div>

        </div>
    )
}

export default OrderDetails