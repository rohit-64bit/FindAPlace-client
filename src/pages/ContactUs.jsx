import React from 'react'
import ContactImage from '../assets/Image/undraw_Contact_us_re_4qqt2.png'

const ContactUs = () => {
    return (
        <>
            <div className='h-screen flex flex-col justify-center w-full items-center'>
                <div className='w-full h-full flex items-center lg:items-end'>
                    <img className='flex w-full lg:object-scale-down lg:w-[50%] opacity-60 lg:opacity-100 select-none ' src={ContactImage} alt="Image" />
                </div>
                <div className='py-8 lg:py-10 flex flex-col w-full px-3 lg:w-[50%] absolute'>
                    <div className='text-[#166534] text-2xl font-bold flex px-10 py-8'>CONTACT US</div>
                    <div className='flex flex-col items-center gap-5 w-full px-4 md:px-10'>
                        <div className='flex flex-col md:flex-row gap-5 w-full duration-300'>
                            <input className='px-5 py-2 rounded-full shadow-md outline-none focus:shadow-lg duration-300 w-full bg-slate-100' type="text" placeholder='Name' />
                            <input className='px-5 py-2 rounded-full shadow-md outline-none focus:shadow-lg duration-300 w-full bg-slate-100' type="text" placeholder='Email' />
                        </div>
                        <textarea className='rounded-lg px-5 py-2 shadow-md outline-none focus:shadow-lg duration-300 w-full bg-slate-100' placeholder='Message' name="" id="" cols="30" rows="7"></textarea>
                        <button className='bg-[#166534] lg:w-[40%] text-white py-1.5 rounded-full shadow-md hover:shadow-lg duration-300 w-full'>SUBMIT</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs