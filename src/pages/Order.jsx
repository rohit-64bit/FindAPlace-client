import React, { useContext, useEffect, useState } from 'react'
import OrderDetails from '../components/OrderDetails'
import { SERVER_URL } from './../services/helper';
import MainContext from '../context/MainContext';
import { Link } from 'react-router-dom';

const Order = () => {

    const authToken = localStorage.getItem('auth-token')

    const { fetchOrder, orderList } = useContext(MainContext)

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <>
            <div className='py-10 min-h-[80vh] max-h-max'>

                <div className='flex justify-center pb-6 md:pb-0 md:py-6 font-bold text-2xl text-[#166534]'>ORDERS</div>

                {
                    orderList?.length ?
                        <div className='flex flex-col gap-5 w-full px-4 lg:px-6 py-3'>

                            {

                                orderList.map((data) => {
                                    return (
                                        <OrderDetails
                                            key={data._id}
                                            data={data}
                                        />
                                    )
                                })
                            }

                        </div>
                        :

                        <div className='flex flex-col gap-3 justify-center items-center py-32'>

                            <div className='flex font-bold text-base sm:text-lg lg:text-xl'>No order history available</div>

                            <Link to='/property' className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-max text-white rounded'>View Property</Link>

                        </div>

                }



            </div>

        </>
    )
}

export default Order