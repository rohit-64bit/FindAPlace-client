import { Avatar, Rating } from '@mui/material'
import React from 'react'

const PropertyReview = () => {
    return (
        <>
            <div className='flex flex-col gap-3'>

                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />

                <div className='font-semibold'>the ambience of the place is amazing</div>

                <div className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor hic doloribus molestiae illum quaerat sunt, repellat laudantium possimus distinctio excepturi pariatur voluptate? Quas quasi consequatur voluptates tempore illum praesentium quidem!.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor hic doloribus molestiae illum quaerat sunt, repellat laudantium possimus distinctio excepturi pariatur voluptate? Quas quasi consequatur voluptates tempore illum praesentium quidem!</div>

                <div className="flex gap-2 md:gap-4 items-center">

                    <Avatar sx={{
                        width: 50,
                        height: 50,
                        '@media (max-width:800px)': {
                            width: 40,
                            height: 40,
                        },
                        '@media (min-width:801px) and (max-width:960px)': {
                            width: 60,
                            height: 60,
                        }
                    }} src='' />

                    <div className="flex flex-col">

                        <div className="text-sm md:text-base font-bold">
                            Hosted by User Name
                        </div>

                        <div className="text-xs md:text-sm text-black/50">
                            Joined on June 20
                        </div>

                    </div>

                </div>

                <div className='border w-full md:w-[30%]'></div>

            </div>
        </>
    )
}

export default PropertyReview