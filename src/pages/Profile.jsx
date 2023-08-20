import React from 'react'

const Profile = () => {



  return (
    <>
      <div className='h-full w-full flex flex-col items-center duration-300 py-5 px-2 lg:p-[3%] xl:p-[8%] gap-3 lg:gap-8'>

        <form className='flex flex-col w-full px-[3%] gap-4 justify-center rounded-xl lg:bg-slate-100 lg:shadow-xl py-5 lg:h-[70vh]'>

          <div className='lg:text-3xl text-xl text-[#166534] font-semibold px-2 w-full flex flex-row justify-between'>Your Profile</div>

          <input
            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            type="text"
            placeholder='Full Name'
          />


          <input
            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            type="text"
            placeholder='Contact'
            pattern="[0-9]+"
            name='contact'
          />

          <textarea
            className='px-5 py-2 rounded-lg outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            placeholder='Enter Full Address'
            name='address'
            cols="30"
            rows="5"
            required
          ></textarea>



          {/* {
                        error ? <div className='text-sm text-red-600 text-center'>Passwored matching failed !</div> : null
                    } */}

          <button
            className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md font-semibold text-lg hover:shadow-lg duration-300 '
            type='submit'
          >
            Confirm Edit
          </button>

        </form>

        <div className='outline outline-[1px] flex lg:hidden rounded-md outline-[#166534] w-full '></div>

        <form className='flex flex-col w-full px-[3%] lg:w-full gap-4 justify-center rounded-xl lg:bg-slate-100 lg:shadow-xl py-5 lg:h-[70vh]'>

          <div className='lg:text-3xl text-xl text-[#166534] font-semibold px-2'>Update Password</div>

          <input
            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            type="password"
            placeholder='Current Password'
          />

          <input
            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            type="password"
            placeholder='New Password'
          />

          <input
            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-white'
            type="password"
            placeholder='Confirm Password'
          />



          {/* {
    error ? <div className='text-sm text-red-600 text-center'>Passwored matching failed !</div> : null
} */}

          <button
            className='bg-[#166534] text-white w-full px-5 py-1.5 rounded-md font-semibold text-lg hover:shadow-lg duration-300 '
            type='submit'
          >
            Submit
          </button>

        </form>


      </div>
    </>
  )
}

export default Profile