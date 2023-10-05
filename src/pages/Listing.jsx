import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../services/helper'
import ListingItems from '../components/ListingItems'
import { Link } from 'react-router-dom'

const Listing = () => {

    const authToken = localStorage.getItem('auth-token')

    const [myListingData, setMyListingData] = useState([])

    const fetchMyListing = async () => {

        const response = await fetch(`${SERVER_URL}property/fetch-my-property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const json = await response.json()

        if (json.success) {
            setMyListingData(json.data)
        }

    }

    useEffect(() => {

        fetchMyListing()

    }, [])

    return (
        <>
            <div className='h-max flex flex-col gap-2'>

                <div className='flex justify-center py-6 font-bold text-lg lg:text-2xl'>Manage Your Listings</div>

                {

                    myListingData.length ?
                        <div className='grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-10 py-3'>

                            {
                                myListingData?.map((data) => {
                                    return (
                                        <ListingItems key={data._id} data={data} refresh={fetchMyListing} />
                                    )
                                })
                            }

                        </div>
                        :

                        <div className='flex flex-col gap-3 justify-center items-center py-32'>

                            <div className='flex font-bold text-base sm:text-lg lg:text-xl'>No Listing Available</div>

                            <Link to='/listproperty' className='text-center px-5 py-1 bg-gradient-to-tr from-green-500 to-[#166534]/90 w-max text-white rounded'>List your place</Link>

                        </div>
                }

            </div>
        </>
    )
}

export default Listing