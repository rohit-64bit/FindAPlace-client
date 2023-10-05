import { Avatar, Rating } from '@mui/material'
import React from 'react'

const Review = (props) => {

    const { data } = props

    return (
        <>
            <section className="container mx-auto px-0 md:px-0 md:py-5 duration-200">
                <div className="grid gap-4">
                    <div className="flex flex-col shadow-md rounded-md border">
                        <div className="flex flex-col justify-between flex-1 p-8">

                            <Rating name="half-rating-read" value={data?.rating} precision={0.5} readOnly />

                            <div className="flex-1 pt-2">

                                <p className="text-lg font-semibold text-gray-800">
                                    {data?.comment}
                                </p>

                                <p className="text-lg text-gray-800">
                                    “{data?.description}”
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Review