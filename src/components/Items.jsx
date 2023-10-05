import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { SERVER_URL } from '../services/helper';

const Items = (props) => {

    const { _id, title, description, location, images, cost, RatingScore, type, totalReviews } = props.data

    const [propertyType, setPropertyType] = useState({})

    const fetchPropertyType = async (type) => {

        const response = await fetch(`${SERVER_URL}property-type/fetch-data/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const json = await response.json()
        if (json.success) {
            setPropertyType(json.data)
        }
    }

    useEffect(() => {
        fetchPropertyType(type)
    }, [])

    return (
        <>

            <div className='w-full h-max p-4 transition-all ease-in-out rounded-xl hover:shadow-xl hover:shadow-black/20 duration-300 outline outline-1 outline-white hover:outline-gray-200'>

                <Link to={`/viewproperty/${_id}`} state={{ data: props.data }} className='w-full flex flex-col gap-2'>

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

                                {propertyType?.type}

                            </div>

                        </div>

                        <div className='flex flex-col justify-between gap-2 h-full'>

                            <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center self-end'>

                                <div>
                                    {RatingScore / totalReviews > 0 ? RatingScore / totalReviews : 0}
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