import React, { useContext } from 'react'
import BookingItemComponent from '../components/BookingItemComponent'
import MainContext from '../context/MainContext'

const Booking = () => {

    const { booking } = useContext(MainContext)

    return (
        <div className='py-10 min-h-[85vh] max-h-max'>

            <div className='flex justify-center pb-6 md:pb-0 md:py-6 font-bold text-2xl text-[#166534]'>BOOKINGS</div>

            {
                booking.length ?

                    <div className='flex flex-col gap-5 w-full px-4 lg:px-6 py-3'>

                        {
                            booking?.map((data) => {
                                return (
                                    <BookingItemComponent key={data._id} data={data} />
                                )
                            })
                        }

                    </div>

                    :

                    <div className='flex flex-col items-center justify-center gap-5 w-full px-4 lg:px-6 py-3 '>

                        <div>No Bookings for your listings.</div>

                    </div>

            }



        </div>
    )
}

export default Booking