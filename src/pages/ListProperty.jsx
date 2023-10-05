import React, { useContext, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RenderImage from '../components/RenderImage';
import { CDN_SERVER_URL, SERVER_URL } from '../services/helper';
import Compressor from 'compressorjs';
import { CLOUDINARY_URL, CLOUD_NAME, UPLOAD_PRESET } from './../services/cloudinary';
import MainContext from './../context/MainContext';
import { useNavigate } from 'react-router-dom';

const ListProperty = () => {

    const navigate = useNavigate()

    const userAuthToken = localStorage.getItem('auth-token')

    const { setNotification } = useContext(MainContext)

    const [loadingStatus, setLoadingStatus] = useState(false)

    const [images, setImages] = useState([])

    const onChangeImage = (event) => {

        const files = event.target.files
        setImages([...images, ...files]);

    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [type, setType] = useState('')
    const [cost, setCost] = useState('')
    const [contact, setContact] = useState('')

    // const handleAddProperty = async (e) => {

    //     e.preventDefault()

    //     const userAuthToken = localStorage.getItem('auth-token')

    //     setLoadingStatus(true)

    //     let uploadedImageUrl = []

    //     let uploaderCount = 0

    //     images?.map((image) => {

    //         const options = {
    //             quality: 0.6,
    //             mimeType: 'image/jpeg'
    //         }

    //         new Compressor(image, {
    //             ...options,
    //             success(result) {

    //                 // upload the image to cloud and then store url into the array then update the counter

    //                 const data = new FormData()
    //                 data.append("file", result)
    //                 data.append("upload_preset", `${UPLOAD_PRESET}`)
    //                 data.append("cloud_name", `${CLOUD_NAME}`)

    //                 fetch(`${CLOUDINARY_URL}`, {
    //                     method: 'POST',
    //                     body: data
    //                 })
    //                     .then(res => res.json())
    //                     .then(jsonData => {

    //                         console.log(jsonData)

    //                         uploaderCount++;

    //                         if (uploaderCount === images.length) {

    //                             fetch(`${SERVER_URL}property/create-property`, {
    //                                 method: 'POST',
    //                                 headers: {
    //                                     'Content-Type': 'application/json',
    //                                     'auth-token': userAuthToken
    //                                 },
    //                                 body: JSON.stringify({

    //                                     title: title,
    //                                     description: description,
    //                                     location: address,
    //                                     cost: cost,
    //                                     images: uploadedImageUrl,
    //                                     type: type,
    //                                     contact: contact

    //                                 }),
    //                             })
    //                                 .then(res => res.json())
    //                                 .then(json => {

    //                                     if (json.success) {

    //                                         setTitle('')
    //                                         setDescription('')
    //                                         setAddress('')
    //                                         setCost('')
    //                                         setImages([])
    //                                         setType('')
    //                                         setContact('')

    //                                         setLoadingStatus(false)
    //                                         setNotification({ status: "true", message: `${json.message}`, type: "info" })

    //                                     } else {

    //                                         setLoadingStatus(false)
    //                                         setNotification({ status: "true", message: `${json.error}`, type: "error" })

    //                                     }

    //                                 })

    //                         }

    //                     })

    //             }
    //         })

    //     })

    // }



    // gpt solution

    const handleAddProperty = async (e) => {

        e.preventDefault();
        setLoadingStatus(true);

        try {

            const compressedImages = await Promise.all(
                images.map(async (image) => {
                    const options = {
                        quality: 0.6,
                        mimeType: 'image/jpeg',
                    };

                    return new Promise((resolve, reject) => {
                        new Compressor(image, {
                            ...options,
                            success(result) {
                                console.log('Compression finished for:', result);

                                // Resolve the promise with the compressed image
                                resolve(result);
                            },
                            error(err) {
                                console.error('Compression error:', err);
                                reject(err);
                            },
                        });
                    });
                })
            );

            // Now, you can proceed with uploading the compressed images to the CDN server
            const formData = new FormData();
            compressedImages.forEach((image) => {
                formData.append('images', image);
            });

            const response = await fetch(`${CDN_SERVER_URL}upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {

                const json = await response.json();
                console.log('CDN Upload response:', json);

                if (json.success) {

                    // After successful CDN upload, you can proceed with other actions,
                    // such as uploading property data to the API server with image links.

                    const response = await fetch(`${SERVER_URL}property/create-property`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': userAuthToken,
                        },
                        body: JSON.stringify({
                            title: title,
                            description: description,
                            location: address,
                            cost: cost,
                            images: json.urls,
                            type: type,
                            contact: contact,
                        }),
                    });

                    const propertyResponse = await response.json();

                    if (propertyResponse.success) {

                        setLoadingStatus(false)
                        navigate('/property')

                        setTitle('')
                        setDescription('')
                        setAddress('')
                        setCost('')
                        setImages([])
                        setType('')
                        setContact('')

                        setNotification({ status: "true", message: `${propertyResponse.message}`, type: "info" })

                    } else {

                        setLoadingStatus(false)
                        setNotification({ status: "true", message: `${propertyResponse.error}`, type: "error" })

                    }

                }

            } else {
                console.error('Failed to upload to CDN server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [pTypeList, setPTypeList] = useState([])

    const fetchPropertyType = async () => {

        const response = await fetch(`${SERVER_URL}property-type/fetch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (json.success) {
            setPTypeList(json.propertyType)
        } else {
            console.error(json.error)
        }

    }

    useEffect(() => {
        fetchPropertyType()
    }, [])

    return (
        <>
            <form
                encType="multipart/form-data"
                onSubmit={handleAddProperty}
                className='w-full xl:h-[87vh] flex flex-col lg:flex-row xl:items-center'
            >

                <div className='lg:w-[50%] flex flex-col lg:p-10 p-4 md:p-6 gap-4'>

                    <div className='lg:px-14 font-semibold'>ADD YOUR PROPERTY</div>

                    <div className='flex flex-col gap-4 lg:px-10'>

                        <input
                            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            type="text"
                            placeholder='Property Name'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            className='px-5 py-2 rounded-lg outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            placeholder='Property Description'
                            cols="30"
                            rows="3"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        >
                        </textarea>

                        <select
                            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            value={type}
                            onChange={e => setType(e.target.value)}
                            required
                        >

                            <option value="">Select Property Type</option>

                            {pTypeList?.map((data) => {
                                return (

                                    <option key={data._id} value={data._id}>
                                        {data.type}
                                    </option>
                                )
                            })}

                        </select>

                        <input
                            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            type="text"
                            placeholder='Rent/Day'
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                            required
                        />

                        <input
                            className='px-5 py-2 rounded-md outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            type="text"
                            placeholder='Contact No.'
                            pattern="[0-9]+"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            required
                        />

                        <textarea
                            className='px-5 py-2 rounded-lg outline outline-1 outline-green-400 focus:outline-[#166534] focus:shadow-xl lg:focus:shadow-lg duration-300 bg-gray-100 lg:bg-gray-200/50'
                            placeholder='Address'
                            cols="30"
                            rows="5"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        ></textarea>

                    </div>

                </div>

                <div className='lg:w-[50%] flex flex-col lg:p-10 p-4 md:p-6 gap-4 justify-between'>

                    <div className='flex flex-col gap-3 lg:p-10'>

                        {
                            images?.length < 5 ?
                                <label htmlFor="dropzone-file" className="bg-white w-full outline outline-1 outline-green-400 focus:outline-[#166534] rounded-lg" >

                                    <div className="relative select-none flex flex-col gap-5 cursor-pointer rounded-lg">
                                        <div className="flex flex-col py-10 px-10 bg-gray-100 rounded-lg">
                                            <CloudUploadIcon className='m-auto text-[#B5B5B5]' fontSize='large' />
                                            <p className="m-auto text-sm text-center text-[#B5B5B5]">Click to select an image. Upload relevant images of your property.</p>
                                        </div>
                                    </div>

                                    <input
                                        onChange={onChangeImage}
                                        multiple
                                        id="dropzone-file"
                                        type="file"
                                        accept='image/*'
                                        className="hidden"
                                        required
                                    />

                                </label>
                                : null
                        }

                        <div className='lg:gap-2 grid grid-cols-4 xl:flex gap-3 py-2 px-1 w-full lg:pt-2'>

                            {
                                images?.map((data, index) => {
                                    return (
                                        <RenderImage data={data} key={index} />
                                    )
                                })
                            }

                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-5 lg:px-10'>

                        {
                            images?.length ?
                                <button
                                    type='button'
                                    className='bg-red-500 w-full py-1.5 font-semibold text-white rounded-md hover:shadow-md duration-300'
                                    onClick={e => setImages([])}
                                >
                                    CLEAR IMAGES
                                </button>
                                : null
                        }

                        {
                            title && description && type != "" && cost && contact && address && images?.length ?
                                <button
                                    type='submit'
                                    className={loadingStatus ? 'bg-slate-200 w-full py-1.5 font-semibold cursor-not-allowed text-black rounded-md duration-300 border border-[#166534]' : 'bg-[#166534] w-full py-1.5 font-semibold text-white rounded-md hover:shadow-md duration-300'}
                                >

                                    {
                                        loadingStatus ? "Uploading..." : "LIST PLACE"
                                    }

                                </button>
                                : null
                        }



                    </div>

                </div>
            </form>
        </>
    )
}

export default ListProperty