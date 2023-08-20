import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImage from '../assets/Image/loginImage2.png'
import { SERVER_URL } from '../services/helper'
import { userAuthToken } from '../services/localStorage'
import MainContext from '../context/MainContext'

const Login = () => {

    const { setNotification } = useContext(MainContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {

        e.preventDefault()

        const response = await fetch(`${SERVER_URL}user/auth-user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (json.success && json.isAuth && json.authToken != undefined) {

            localStorage.setItem('auth-token', json.authToken)
            setNotification({ status: "true", message: `${json.message}`, type: "success" })
            navigate('/')

        } else if (json.success && !json.isAuth) {

            sessionStorage.setItem('type', 'auth')
            sessionStorage.setItem('email', json.email)
            setNotification({ status: "true", message: `${json.message}`, type: "info" })
            navigate('/verify-auth')

        } else {

            setNotification({ status: "true", message: `${json.error}`, type: "error" })

        }

    }

    useEffect(() => {
        if (userAuthToken) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300'>

                <form
                    onSubmit={handleLogin}
                    method='POST'
                    className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-white/80 lg:bg-white h-full justify-center'
                >

                    <div className='text-3xl text-[#166534] font-semibold px-2'>Login</div>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="email"
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 lg:bg-gray-200/50 bg-gray-100'
                        type="password"
                        placeholder='Enter Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        minLength={8}
                        required
                    />

                    <button
                        className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md font-semibold text-lg hover:shadow-lg duration-300'
                        type='submit'
                    >
                        Login
                    </button>

                    <Link to='/signup' className='text-slate-500 hover:text-black duration-300'>Create new account?</Link>

                </form>

                <div className='lg:w-[50%] w-full flex lg:justify-center md:justify-end items-center h-full lg:items-end'>
                    <img className='md:w-[60%] lg:w-[90%] w-full' src={LoginImage} alt="Image" />
                </div>

            </div>
        </>
    )
}

export default Login