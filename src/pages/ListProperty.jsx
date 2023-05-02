import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RenderImage from '../components/RenderImage';

const ListProperty = () => {
    return (
        <>
            <div className='w-full xl:h-[87vh] flex flex-col lg:flex-row xl:items-center'>

                <div className='lg:w-[50%] flex flex-col lg:p-10 p-4 md:p-6 gap-4'>
                    <div className='lg:px-14 font-semibold'>ADD YOUR PROPERTY</div>
                    <div className='flex flex-col gap-4 lg:px-10'>
                        <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Full Name' />
                        <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Property Address' />
                        <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Rent/Day' />
                        <input className='px-5 py-2 rounded-full outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' type="text" placeholder='Contact No.' />
                        <textarea className='px-5 py-2 rounded-lg outline-none focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50' placeholder='Address' name="" id="" cols="30" rows="5"></textarea>
                    </div>
                </div>

                <div className='border-2 w-full px-5 lg:hidden'></div>

                <div className='lg:w-[50%] flex flex-col lg:p-10 p-4 md:p-6 gap-4 justify-between'>
                    <div className='flex flex-col gap-3 lg:p-10'>
                        <label htmlFor="dropzone-file" className="bg-white w-full" >
                            <div className="relative rounded-full select-none flex flex-col gap-5 cursor-pointer">
                                <div className="flex flex-col py-10 rounded-2xl bg-gray-100">
                                    <CloudUploadIcon className='m-auto text-[#B5B5B5]' fontSize='large' />
                                    <p className="m-auto text-sm text-[#B5B5B5]">Click to select an image</p>
                                </div>
                            </div>
                            <input id="dropzone-file" type="file" accept='image/*' className="hidden" />
                        </label>
                        <div className='lg:gap-2 grid grid-cols-4 xl:flex xl:gap-3 py-2 px-1 w-full lg:pt-2'>
                            <RenderImage />
                        </div>
                    </div>
                    <div className='w-full lg:px-10'>
                        <button className='bg-[#4DD637] w-full py-1.5 font-semibold text-white rounded-md hover:shadow-md duration-300'>LIST PLACE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProperty