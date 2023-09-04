import React, { useContext, useEffect, useState } from 'react'
import LoginImage from '../assets/Image/loginImage2.png'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import { SERVER_URL } from '../services/helper'

const ResetPassword = () => {

    const navigate = useNavigate()

    const { setNotification } = useContext(MainContext)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleResetPassword = async (e) => {

        e.preventDefault()

        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError(true)
            setLoading(false)
            return
        } else {

            const response = await fetch(`${SERVER_URL}forget-password/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: sessionStorage.getItem('redirect-email'),
                    password: formData.password
                })
            })

            const json = await response.json()

            if (json.success) {

                setNotification({ message: `${json.message}`, status: 'true', type: 'success' })

                setLoading(false)
                navigate('/login')

            } else {

                setNotification({ message: `${json.error}`, status: 'true', type: 'error' })
                setLoading(false)

            }

        }

    }

    useEffect(() => { setError(false) }, [formData])

    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300'>

                <form
                    method='POST'
                    onSubmit={handleResetPassword}
                    className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-white/80 lg:bg-white h-full justify-center'
                >

                    <div className='lg:text-3xl text-xl text-[#166534] font-semibold '>Create new password</div>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="password"
                        onChange={handleInputChange}
                        placeholder='New Password'
                        value={formData.password}
                        name='password'
                        required
                    />

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="password"
                        placeholder='Confirm Password'
                        onChange={handleInputChange}
                        value={formData.confirmPassword}
                        name='confirmPassword'
                        required
                    />

                    {
                        error ? <div className='text-sm text-red-600 text-center'>Passwored matching failed !</div> : null
                    }

                    <button
                        className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md md:font-semibold md:text-lg hover:shadow-lg duration-300 disabled:bg-slate-300 disabled:text-black disabled:cursor-not-allowed'
                        type='submit'
                        disabled={loading}
                    >

                        {loading ? 'Loading...' : 'Reset Password'}

                    </button>

                </form>

                <div className='lg:w-[50%] w-full hidden md:flex lg:justify-center md:justify-end items-center h-full lg:items-end'>
                    <img className='md:w-[60%] lg:w-[90%] w-full' src={LoginImage} alt="Image" />
                </div>

            </div>
        </>
    )
}

export default ResetPassword