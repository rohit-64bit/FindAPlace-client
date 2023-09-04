import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import MainContext from '../context/MainContext';
import { SERVER_URL } from './../services/helper';

const Profile = () => {

  const authToken = localStorage.getItem('auth-token');

  const { userProfile, fetchUserProfile, profileLoadingStatus, setNotification } = useContext(MainContext)

  const { name, _id, email, address, contact, isAuth } = userProfile

  const [editProfile, setEditProfile] = useState(false)

  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    address: "",
    contact: ""
  });

  const [editLoading, setEditLoading] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [passError, setPassError] = useState(false)

  const handleChange = (e) => {
    setEditProfileForm({ ...editProfileForm, [e.target.name]: e.target.value })
  }

  const handleProfileEdit = async (e) => {

    e.preventDefault()

    setEditLoading(true)

    const response = await fetch(`${SERVER_URL}user/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify(editProfileForm)
    })

    const json = await response.json()

    if (json.success) {
      setEditLoading(false)
      setEditProfile(false)
      fetchUserProfile()
      setNotification({ type: "success", message: `${json.message}`, status: "true" })
    } else {
      setEditLoading(false)
      setNotification({ type: "error", message: `${json.error}`, status: "true" })
    }

  }

  const onPassChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const [passLoading, setPasswordLoading] = useState(false)

  const handleUpdatePassword = async (e) => {

    e.preventDefault()
    setPasswordLoading(true)
    console.log(passwordForm)

    if (passwordForm.newPassword === passwordForm.confirmPassword) {

      const response = await fetch(`${SERVER_URL}user/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(passwordForm)
      })

      const json = await response.json()

      if (json.success) {

        setPasswordLoading(false)

        setNotification({ type: "success", status: "true", message: `${json.message}` })
      } else {
        setPasswordLoading(false)
        setNotification({ type: "error", status: "true", message: `${json.error}` })
      }

    } else {
      setPasswordLoading(false)
      setPassError(true)
      return;

    }

  }

  useEffect(() => {

    if (editProfileForm.name !== '' || editProfileForm.address !== '' || editProfileForm.contact !== '') {
      setEditProfile(true)
    }

  }, [editProfileForm])

  return (
    <>
      <div className='h-max lg:h-[85vh] flex flex-col lg:flex-row gap-10 p-5 md:p-20'>

        <div className='bg-white p-8 border flex flex-col gap-2 shadow-lg h-max items-center rounded-lg w-full lg:w-[20%]'>

          <Avatar src='' sx={{ height: 80, width: 80 }} />

          {
            profileLoadingStatus ?

              <div className='flex flex-col gap-2 items-center'>

                <div className='bg-slate-300 py-2 w-full animate-pulse'></div>
                <div className='bg-slate-300 py-2 w-full animate-pulse'></div>
                <div className='bg-slate-300 py-1 w-[60%] animate-pulse'></div>

              </div> :
              <div className='flex flex-col gap-2 items-center'>

                <div className='text-lg font-semibold'>{name}</div>

                <div>{email}</div>

                <div className='text-xs opacity-50'>{_id}</div>

              </div>
          }



        </div>

        <div className='w-full flex flex-col sm:flex-row gap-10 h-max'>

          <div className='bg-white p-5 md:p-8 border flex flex-col gap-2 shadow-lg h-max items-center duration-300 rounded-lg w-full'>

            <div className='flex justify-between items-center w-full'>

              <div className='font-bold'>My Profile</div>

              {/* <button onClick={() => editProfile ? setEditProfile(false) : setEditProfile(true)} className='border px-4 py-1 rounded hover:bg-slate-300 duration-300'>{editProfile ? "Cancel" : "Edit"}</button> */}

            </div>

            <form
              className='flex flex-col gap-3 w-full'
              method='POST'
              onSubmit={handleProfileEdit}
            >

              <div className="flex flex-col gap-1">

                <label className='text-xs'>Name : {name}</label>
                <input
                  type="text"
                  className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                  placeholder='Enter your name'
                  name='name'
                  value={editProfileForm.name}
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-1">

                <label className='text-xs'>Contact : {contact}</label>
                <input
                  type="text"
                  className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                  placeholder='Enter your contact no'
                  pattern='[0-9]+'
                  name='contact'
                  value={editProfileForm.contact}
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-1">

                <label className='text-xs'>Address : {address}</label>
                <textarea
                  type="text"
                  className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                  placeholder='Enter your address'
                  rows="4"
                  name='address'
                  value={editProfileForm.address}
                  onChange={handleChange}
                />

              </div>

              <button
                type='submit'
                className='border px-4 py-1 rounded bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white disabled:text-black disabled:bg-none disabled:cursor-not-allowed duration-300'
                disabled={!editProfile}
              >
                {editLoading ? 'Updating...' : 'Update Profile'}
              </button>

            </form>

          </div>

          <div className='bg-white p-5 md:p-8 border flex flex-col gap-2 shadow-lg h-max rounded-lg w-full'>

            <div className='font-bold'>Update Password</div>

            <form method='post' onSubmit={handleUpdatePassword} className='flex flex-col gap-3 w-full'>

              <input
                type="password"
                className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                placeholder='Current Password'
                name='password'
                value={passwordForm.currentPassword}
                onChange={onPassChange}
                required
                minLength={8}
              />

              <input
                type="password"
                className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                placeholder='New Password'
                name='newPassword'
                value={passwordForm.newPassword}
                onChange={onPassChange}
                required
                minLength={8}
              />

              <input
                type="password"
                className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={passwordForm.confirmPassword}
                onChange={onPassChange}
                required
                minLength={8}
              />

              {
                passError &&
                <div className='text-center text-red-500 animate-pulse'>Password match failed</div>
              }


              <button
                type='submit'
                className='border px-4 py-1 rounded bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white disabled:text-black disabled:bg-none disabled:cursor-not-allowed duration-300'
              >
                {passLoading ? 'Updating...' : 'Update Password'}
              </button>

            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Profile