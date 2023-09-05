import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';

const Items = (props) => {

    const { title, description, location, images, cost, RatingScore, typeName } = props.data

    return (
        <>

            <div className='w-full h-max p-4 transition-all ease-in-out rounded-xl hover:shadow-xl hover:shadow-black/20 duration-300 outline outline-1 outline-white hover:outline-gray-200'>

                <Link to='/viewproperty' state={{ data: props.data }} className='w-full flex flex-col gap-2'>

                    <img
                        src={images[0]}
                        alt=""
                        className="h-64 w-full object-cover transition duration-500 rounded-xl group-hover:scale-105 sm:h-72" />

                    <div className="flex justify-between items-center">

                        <div className="h-full">

                            <div className="text-xl text-gray-900 font-semibold">

                                {title}

                            </div>

                            <div className="text-sm text-gray-500">

                                {location}

                            </div>

                            <div className="text-sm text-gray-500">

                                {typeName}

                            </div>

                        </div>

                        <div className='flex flex-col justify-between gap-2 h-full'>

                            <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center self-end'>

                                <div>
                                    {RatingScore}
                                </div>

                                <StarIcon fontSize='' />

                            </div>

                            <div className="font-bold">$ {cost}</div>

                        </div>

                    </div>
                </Link>

            </div >

        </>
    )
}

export default Items