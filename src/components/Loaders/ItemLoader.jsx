import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const ItemLoader = () => {

    return (

        <div className='w-full h-max p-4 transition-all ease-in-out rounded-xl shadow-black/20 duration-300 outline outline-1 outline-gray-200'>

            <div className='w-full flex flex-col gap-2'>

                <div
                    className="h-64 w-full object-cover transition duration-500 rounded-xl group-hover:scale-105 sm:h-72  bg-slate-200 animate-pulse" />

                <div className="flex justify-between items-center gap-5 h-full">

                    <div className="h-full flex flex-col w-full gap-1">

                        <div className="text-xl text-gray-900 font-semibold py-2 bg-slate-200 animate-pulse rounded">



                        </div>

                        <div className="text-sm text-gray-500 w-full py-1 bg-slate-200 animate-pulse rounded">



                        </div>

                        <div className="text-sm text-gray-500 w-full py-1 bg-slate-200 animate-pulse rounded">



                        </div>

                    </div>

                    <div className='flex flex-col justify-between gap-2 h-full'>

                        <div className='text-white text-sm w-max px-1.5 py-0.5 rounded-md flex items-center self-end bg-slate-200 animate-pulse'>

                            <div>
                                0
                            </div>

                            <StarIcon fontSize='' />

                        </div>

                        <div className="font-bold bg-slate-200 animate-pulse px-1.5 py-1.5 rounded"></div>

                    </div>

                </div>
            </div>

        </div >
    )
}

export default ItemLoader