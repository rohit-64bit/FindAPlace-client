import React, { useContext, useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
import { SERVER_URL } from '../services/helper';
import MainContext from '../context/MainContext';

const BookingItemComponent = (props) => {

    const authToken = localStorage.getItem('auth-token');

    const { setNotification, fetchBooking } = useContext(MainContext)

    const { data } = props
    const [userData, setUserData] = useState({})

    const calculateTotalDays = () => {

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        const timeDifference = endDate - startDate;

        const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return totalDays;

    }

    const totalDays = calculateTotalDays();

    const statusSelectorData = [
        {
            name: 'confirmed'
        },
        {
            name: 'complete'
        },
        {
            name: 'cancelled'
        }

    ]

    const fetchUserData = async () => {

        fetch(`${SERVER_URL}user/user-profile/${data.userID}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {
                    setUserData(json.user)
                }

            })
            .catch(err => {
                console.error(err);
            })

    }

    const [propertyDetails, setPropertyDetails] = useState({})
    const [imageLink, setImageLink] = useState('')

    const fetchPropertyDetails = async () => {

        const response = await fetch(`${SERVER_URL}property/fetch-property-details/${data.propertyID}`)

        const json = await response.json()

        if (json.success) {

            setPropertyDetails(json.data)
            setImageLink(json.data.images[0])

        } else {
            console.error(json)
        }

    }

    const [orderStatus, setOrderStatus] = useState('')

    const handleUpdateOrderStatus = async (e) => {

        e.preventDefault()

        const response = await fetch(`${SERVER_URL}booking/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ status: orderStatus, bookingID: data._id })
        })

        const json = await response.json()

        if (json.success) {
            fetchBooking()
            setOrderStatus('')
            setNotification({
                type: 'success',
                message: `${json.message}`,
                status: 'true'
            })
        } else {
            setNotification({
                type: 'error',
                message: `${json.error}`,
                status: 'true'
            })
        }

    }

    useEffect(() => {

        fetchUserData()
        fetchPropertyDetails()

    }, [])

    return (
        <div className="border border-white hover:border-slate-200 rounded-lg flex flex-col gap-4 md:gap-5 md:flex-row justify-between hover:shadow-md p-5 duration-300 items-center">

            <div className="flex flex-col justify-between gap-2 w-full md:w-[20%] h-max">
                <img src={imageLink} className="w-full h-full rounded-md object-cover" alt="Property Image" />

                <div className="flex justify-between">
                    <div className="font-bold">{propertyDetails?.title}</div>
                    <div className="text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center self-end">
                        <div>0</div>
                        <StarIcon fontSize="" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 h-full w-full md:w-[25%]">

                <div className="flex flex-col gap-1 h-max">
                    <div>From: {moment(data.startDate).format('MMM DD YYYY')}</div>
                    <div>To: {moment(data.endDate).format('MMM DD YYYY')}</div>
                    <div>Status: {data.status}</div>
                    <div>Total Billing Amount: $ {totalDays * propertyDetails?.cost}</div>
                </div>

                <div className="flex flex-col h-max gap-1">

                    <p className="text-base font-bold text-gray-500">Customer Details</p>

                    <p className="text-base font-semibold text-gray-800">{userData?.name}</p>
                    <p className="text-base text-gray-500 truncate">{userData?.email}</p>
                    <p className="text-base text-gray-500 truncate">contact : {userData?.contact}</p>
                    
                </div>

            </div>

            <form onSubmit={handleUpdateOrderStatus} method='POST' className="flex flex-col border w-full md:w-max h-max rounded">

                <select onChange={e => setOrderStatus(e.target.value)} className="px-5 py-2 rounded-t-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50" required>
                    <option value="">Select Order Status</option>
                    {
                        statusSelectorData.map((data, index) => {
                            return (
                                <option key={index} value={data.name}>{data.name}</option>
                            )
                        })
                    }

                </select>

                <button className="text-center px-5 py-2 bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white rounded-b w-full outline outline-1 outline-green-400 focus:outline-[#166534]">Update Status</button>
            </form>

        </div>

    )
}

export default BookingItemComponent