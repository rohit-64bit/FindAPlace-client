import React, { useContext, useEffect, useState } from 'react'
import OrderDetails from '../components/OrderDetails'
import { SERVER_URL } from './../services/helper';
import MainContext from '../context/MainContext';

const Order = () => {

    const authToken = localStorage.getItem('auth-token')

    const { fetchOrder, orderList } = useContext(MainContext)

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <>
            <div className='py-10 min-h-[85vh] max-h-max'>

                <div className='flex justify-center pb-6 md:pb-0 md:py-6 font-bold text-2xl text-[#166534]'>ORDERS</div>

                <div className='flex flex-col gap-5 w-full px-4 lg:px-6 py-3'>

                    {
                        orderList &&
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

            </div>

        </>
    )
}

export default Order