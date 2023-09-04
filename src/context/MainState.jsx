import React, { useState } from 'react'
import MainContext from './MainContext'
import { SERVER_URL } from './../services/helper';

const MainState = (props) => {

    const authToken = localStorage.getItem('auth-token')

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
            }}
        >
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState