import React from 'react'
import { Navigate } from 'react-router-dom'

const TfaRoute = ({ children }) => {
    return sessionStorage.getItem('redirect-type') != undefined && sessionStorage.getItem('redirect-email') != undefined ? children : <Navigate to='/login' />
}

export default TfaRoute