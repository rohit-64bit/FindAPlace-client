import React, { useState } from 'react'
import MainContext from './MainContext'
import { SERVER_URL } from './../services/helper';
import { useNavigate } from 'react-router-dom';

const MainState = (props) => {

    const authToken = localStorage.getItem('auth-token')

    const navigate = useNavigate()

    const [notification, setNotification] = useState({})

    const [place, setPlace] = useState('');

    const [propertyList, setPropertyList] = useState([])

    const [propertyLoading, setPropertyLoading] = useState(false)

    const fetchProperty = async () => {

        setPropertyLoading(true)

        fetch(`${SERVER_URL}property/fetch-property`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {
                    setPropertyList(json.data)
                    setPropertyLoading(false)
                }

            })
    }

    const [profileLoadingStatus, setProfileLoadingStatus] = useState(false)

    const [userProfile, setUserProfile] = useState({})

    const fetchUserProfile = async () => {

        setProfileLoadingStatus(true)
        const response = await fetch(`${SERVER_URL}user/get-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const json = await response.json()

        if (json.success) {
            sessionStorage.setItem('sessionUserID', json.user._id)
            setProfileLoadingStatus(false)
            setUserProfile(json.user)
        }

    }

    const [orderList, setOrderList] = useState()

    const fetchOrder = async () => {
        const response = await fetch(`${SERVER_URL}booking/fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const json = await response.json()

        if (json.success) {
            setOrderList(json.data)
        }

    }

    const [booking, setBooking] = useState([])
    const [newBooking, setNewBooking] = useState(0)

    const fetchBooking = async () => {

        const response = await fetch(`${SERVER_URL}booking/fetch-bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': authToken
            }
        })

        const json = await response.json()

        if (json.success) {
            setBooking(json.data)
            setNewBooking(json.newData)
        } else {
            console.error(json);
        }

    }

    const [searchQuery, setSearchQuery] = useState('')

    const handlePropertySearch = (e) => {

        e.preventDefault();

        setPropertyLoading(true)

        fetch(`${SERVER_URL}property/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: searchQuery })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setPropertyLoading(false)
                    setPropertyList(json.data)
                    navigate('/property')
                }
            })
            .catch(err => {
                console.error(err)
            })

    }

    const [contactLoader, setContactLoader] = useState(false)

    const handleContact = async (data) => {

        setContactLoader(true)

        const response = await fetch(`${SERVER_URL}mail/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();

        if (json.success) {

            setNotification({
                status: 'true',
                type: 'success',
                message: `${json.message}`
            })

            setContactLoader(false)

            return;

        } else {

            setNotification({
                status: 'true',
                type: 'error',
                message: "something went wrong"
            })

            setContactLoader(false)

            return;

        }

    }

    return (
        <MainContext.Provider
            value={{
                notification,
                setNotification,
                propertyList,
                setPropertyList,
                fetchProperty,
                place,
                setPlace,
                userProfile,
                fetchUserProfile,
                profileLoadingStatus,
                propertyLoading,
                orderList,
                fetchOrder,
                booking,
                newBooking,
                fetchBooking,
                searchQuery,
                setSearchQuery,
                handlePropertySearch,
                contactLoader,
                handleContact
            }}
        >
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState