import React from 'react'
import Items from '../components/Items'

const Order = () => {
    return (
        <>
            <div>
                <div className='flex justify-center py-6 font-bold text-2xl text-[#4DD637]'>ORDERS</div>
                <div className='grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4 lg:px-6 py-3'>
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                    <Items />
                </div>

            </div>

        </>
    )
}

export default Order