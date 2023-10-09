import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignupImage from '../assets/Image/signUp2.png'
import { SERVER_URL } from './../services/helper';
import MainContext from '../context/MainContext';

const SignUp = () => {

    const userAuthToken = localStorage.getItem('auth-token')

    const { setNotification } = useContext(MainContext)

    const navigate = useNavigate()

    const [details, setDetails] = useState({

        name: "",
        email: "",
        contact: "",
        address: "",
        password: "",
        confirmPassword: ""

    })

    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [details.password, details.confirmPassword])

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSignup = async (e) => {

        e.preventDefault()

        if (details.password !== details.confirmPassword) {
            setError(true)
        } else {

            const response = await fetch(`${SERVER_URL}user/create-user`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })

            const json = await response.json()

            if (json.success) {

                sessionStorage.setItem("redirect-type", "auth")
                sessionStorage.setItem("redirect-email", details.email)

                setNotification({ status: "true", message: `${json.message}`, type: "info" })
                navigate('/verify-auth')

            } else {

                setNotification({ status: "true", message: `${json.error}`, type: "error" })

            }

        }

    }

    useEffect(() => {
        if (userAuthToken) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className='h-screen w-full flex items-center justify-between duration-300 py-'>

                <form onSubmit={handleSignup} method='POST' className='flex flex-col w-full px-[5%] md:px-[11%] lg:w-[50%] gap-4 absolute lg:relative bg-white/80 lg:bg-white h-full justify-center py-5'>

                    <div className='lg:text-3xl text-xl text-[#166534] font-semibold px-2'>Create New Account</div>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        type="text"
                        placeholder='Full Name'
                        name='name'
                        onChange={onChange}
                        value={details.name}
                        required
                    />

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={onChange}
                        value={details.email}
                        required
                    />

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        type="text"
                        placeholder='Contact'
                        pattern="[0-9]+"
                        name='contact'
                        onChange={onChange}
                        value={details.contact}
                        required
                    />

                    <textarea
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        placeholder='Enter Full Address'
                        name='address'
                        onChange={onChange}
                        value={details.address}
                        cols="30"
                        rows="5"
                        required
                    ></textarea>

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        type="password"
                        placeholder='Enter Password'
                        name='password'
                        required
                        onChange={onChange}
                        value={details.password}
                        minLength={8}
                    />

                    <input
                        className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        required
                        onChange={onChange}
                        value={details.confirmPassword}
                        minLength={8}
                    />

                    {
                        error ? <div className='text-sm text-red-600 text-center'>Passwored matching failed !</div> : null
                    }

                    <button
                        className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md font-semibold text-lg hover:shadow-lg duration-300 '
                        type='submit'
                    >
                        Sign Up
                    </button>

                </form>

                <div className='lg:w-[50%] w-full hidden md:flex lg:justify-center md:justify-end items-center lg:items-end h-full'>
                    <img className='md:w-[60%] lg:w-[70%] w-full' src={SignupImage} alt="Image" />
                </div>
            </div>
        </>
    )
}

export default SignUp