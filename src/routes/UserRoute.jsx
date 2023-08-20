import React from 'react'
import { Navigate } from 'react-router-dom'

const UserRoute = ({ children }) => {
    return localStorage.getItem('auth-token') ? children : <Navigate to='/login' />
}

export default UserRoute