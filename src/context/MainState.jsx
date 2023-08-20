import React, { useState } from 'react'
import MainContext from './MainContext'
import { SERVER_URL } from './../services/helper';

const MainState = (props) => {

    const [notification, setNotification] = useState({})

    const [place, setPlace] = useState('');

    const [propertyList, setPropertyList] = useState([])

    const fetchProperty = async () => {

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
                }

            })
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
                setPlace
            }}
        >
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState