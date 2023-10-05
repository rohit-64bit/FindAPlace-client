import { Avatar, IconButton, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../services/helper';
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';

const PropertyReview = (props) => {

    const sessionUserID = sessionStorage.getItem('sessionUserID')
    const { refresh } = props;

    const { _id, comment, date, description, reply, userID, rating } = props.data

    const [userData, setUserData] = useState({})

    const fetchUserData = async () => {

        const response = await fetch(`${SERVER_URL}user/user-profile/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (json.success) {
            setUserData(json.user)
        } else {
            console.error(json);
        }

    }

    const { name, joinedOn } = userData

    const handleReviewDelete = async () => {

        const response = await fetch(`${SERVER_URL}review/delete-review/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })

        const json = await response.json()

        if (json.success) {

            refresh()

        } else {
            console.error(json);
        }

    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
            <div className='flex flex-col gap-3 w-full'>

                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />

                <div className='font-semibold'>{comment}</div>

                <div className='text-sm'>{description}</div>

                <div className="flex gap-2 md:gap-4 items-center justify-between">

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
                                Review by {name}
                            </div>

                            <div className="text-xs md:text-sm text-black/50">
                                On {moment(date).format('MMM DD, YYYY')}
                            </div>

                        </div>
                    </div>

                    {
                        sessionUserID === userID && (
                            <IconButton onClick={handleReviewDelete}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }



                </div>

                <div className='border w-full md:w-[30%]'></div>

            </div>
        </>
    )
}

export default PropertyReview