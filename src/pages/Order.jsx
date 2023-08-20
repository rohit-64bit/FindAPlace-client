import React from 'react'
import OrderDetails from '../components/OrderDetails'

const Order = () => {
    return (
        <>
            <div className='py-10'>

                <div className='flex justify-center py-6 font-bold text-2xl text-[#166534]'>ORDERS</div>

                <div className='flex flex-col gap-5 w-full px-4 lg:px-6 py-3'>

                    <OrderDetails /> 
                    <OrderDetails /> 
                    <OrderDetails /> 
                    <OrderDetails /> 
                    <OrderDetails /> 
                    
                </div>

            </div>

        </>
    )
}

export default Order