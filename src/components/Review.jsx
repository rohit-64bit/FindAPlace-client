import { Avatar, Rating } from '@mui/material'
import React from 'react'

const Review = () => {
    return (
        <>
            <section className="container mx-auto px-0 md:px-0 md:py-5 duration-200">
                <div className="grid gap-4">
                    <div className="flex flex-col shadow-lg rounded-md border">
                        <div className="flex flex-col justify-between flex-1 p-8">

                            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />

                            <div className="flex-1 pt-2">
                                
                                    <p className="text-lg text-gray-800">
                                        “ I loved the platform it helped me to rent my property for functions. ”
                                    </p>
                                
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-300">

                                <div className="flex items-center">

                                    <Avatar src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                                        alt="" />

                                    <div className="min-w-0 ml-3">
                                        <p
                                            className="text-base font-semibold text-gray-800 truncate">
                                            Theresa Webb
                                        </p>
                                        <p className="text-base text-gray-500 truncate">Web Designer</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Review