import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImage from '../assets/Image/loginImage2.png'
import { SERVER_URL } from '../services/helper'
import MainContext from '../context/MainContext'

const VerifyOtp = () => {

    const navigate = useNavigate()

    const { setNotification } = useContext(MainContext)

    const [otp, setOtp] = useState('')

    const email = sessionStorage.getItem('email')
    const type = sessionStorage.getItem('type')

    const handleOtpVerification = async (e) => {

        e.preventDefault()

        if (type === 'auth') {

            const response = await fetch(`${SERVER_URL}user/auth-user/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            })

            const json = await response.json()

            if (json.success && json.authToken != undefined) {

                localStorage.setItem('auth-token', json.authToken)
                sessionStorage.removeItem('type')
                sessionStorage.removeItem('email')
                navigate('/')
                setNotification({ status: "true", message: `${json.message}`, type: "success" })

            } else {

                setNotification({ status: "true", message: `${json.error}`, type: "error" })

            }

        } else if (type === 'reset') {

            const response = await fetch(`${SERVER_URL}forget-password/validate-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            })

            const json = await response.json()

            if (json.success) {

                // on success otp validation route to reset password page

                setNotification({ status: "true", message: `${json.message}`, type: "success" })

            } else {

                setNotification({ status: "true", message: `${json.error}`, type: "error" })

            }

        }

    }

    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300'>

                <form onSubmit={handleOtpVerification} method='POST' className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-white/80 lg:bg-white h-full justify-center'>

                    <div className='text-3xl text-[#166534] font-semibold px-2'>Verify your email</div>
                    <div className='opacity-70 px-2'>OTP sent on {email}</div>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="text"
                        placeholder='Enter OTP sent on your mail.'
                        pattern='[0-9]+'
                        maxLength={6}
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                    />

                    <button
                        className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md font-semibold text-lg hover:shadow-lg duration-300'
                        type='submit'
                    >
                        Verify
                    </button>

                </form>

                <div className='lg:w-[50%] w-full flex lg:justify-center md:justify-end items-center h-full lg:items-end'>
                    <img className='md:w-[60%] lg:w-[90%] w-full' src={LoginImage} alt="Image" />
                </div>

            </div>
        </>
    )
}

export default VerifyOtp