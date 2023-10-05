import React, { useContext, useState } from 'react'
import MainContext from '../context/MainContext'

const HelpSupport = () => {

  const { contactLoader,
    handleContact, userProfile } = useContext(MainContext)

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {

    e.preventDefault()

    const data = {
      email: userProfile.email,
      subject: formData.subject,
      message: formData.message,
      type: 'support'
    }

    handleContact(data)

    setFormData({
      subject: "",
      message: "",
    })

  }

  return (

    <div className='py-10 px-8 min-h-[85vh] max-h-max flex items-center justify-center'>

      <form
        method='POST'
        className='bg-white p-5 md:p-8 border flex flex-col gap-2.5 shadow-lg h-max duration-300 rounded-lg w-full sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%]'
        onSubmit={handleFormSubmit}
      >
        <div className='font-bold'>Contact Support</div>

        <input
          type="text"
          className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
          placeholder='Subject'
          name='subject'
          value={formData.subject}
          onChange={onChange}
        />

        <textarea
          type="text"
          className='w-full outline outline-2 outline-slate-200 rounded focus:outline-slate-400 px-3 py-1 duration-300'
          placeholder='Write your query here...'
          rows="4"
          name='message'
          value={formData.message}
          onChange={onChange}
        />

        <button
          type='submit'
          className='border px-4 py-1 rounded bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white disabled:text-black disabled:bg-none disabled:cursor-not-allowed duration-300'
          disabled={contactLoader}
        >
          {contactLoader ? 'Sending...' : 'Contact Support'}
        </button>

      </form>

    </div>
  )
}

export default HelpSupport