import React, { useContext, useState } from 'react'
import LoginImage from '../assets/Image/loginImage2.png'
import { Link, useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../services/helper'
import MainContext from '../context/MainContext'

const ForgetPassword = () => {

    const navigate = useNavigate()

    const { setNotification } = useContext(MainContext)

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')

    const handleForgetPassword = async (e) => {

        e.preventDefault()

        setLoading(true)

        sessionStorage.setItem('redirect-email', email)
        sessionStorage.setItem('redirect-type', 'reset')

        const response = await fetch(`${SERVER_URL}forget-password/generate-otp`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email
            })
        })

        const json = await response.json()

        if (json.success) {

            setLoading(false)

            navigate('/verify-auth')

            setNotification({ status: 'true', type: 'success', message: `${json.message}` })

        } else {

            setLoading(false)
            setNotification({ status: 'true', type: 'error', message: `${json.error}` })
        }

    }

    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300'>

                <form
                    method='POST'
                    onSubmit={handleForgetPassword}
                    className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-white/80 lg:bg-white h-full justify-center'
                >

                    <div className='lg:text-3xl text-xl text-[#166534] font-semibold '>Enter you email</div>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md md:font-semibold md:text-lg hover:shadow-lg duration-300 disabled:bg-slate-300 disabled:text-black disabled:cursor-not-allowed'
                        type='submit'
                        disabled={loading}
                    >

                        {loading ? 'Loading...' : 'Generate OTP'}

                    </button>

                    <Link to='/login' className='text-slate-500 hover:text-black duration-300 w-max'>Already have an account !</Link>

                </form>

                <div className='lg:w-[50%] w-full hidden md:flex lg:justify-center md:justify-end items-center h-full lg:items-end'>
                    <img className='md:w-[60%] lg:w-[90%] w-full' src={LoginImage} alt="Image" />
                </div>

            </div>
        </>
    )
}

export default ForgetPassword