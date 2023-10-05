import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Modal } from '@mui/material';
import { SERVER_URL } from './../services/helper';
import MainContext from './../context/MainContext';

const ListingItems = (props) => {

    const authToken = localStorage.getItem('auth-token')

    const { refresh } = props

    const { title, description, location, images, cost, RatingScore, typeName, _id } = props.data

    const { setNotification } = useContext(MainContext)

    const [openEdit, setOpenEdit] = useState(false);
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleDeleteOpen = () => setOpenDelete(true);
    const handleDeleteClose = () => setOpenDelete(false);

    const handleDelete = async () => {

        const response = await fetch(`${SERVER_URL}property/delete-property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({
                propertyID: _id
            })
        })
        const json = await response.json()

        if (json.success) {

            refresh()
            handleDeleteClose()

            setNotification({
                type: 'success',
                message: `${json.message}`,
                status: 'true'
            })
        } else {
            setNotification({
                type: 'error',
                message: `${json.error}`,
                status: 'true'
            })
        }

    }

    return (
        <>

            <div className='w-full h-max p-4 transition-all ease-in-out rounded-xl hover:shadow-xl hover:shadow-black/20 duration-300 outline outline-1 outline-white hover:outline-gray-200'>

                <div className='w-full flex flex-col gap-2'>

                    <img
                        src={images[0]}
                        alt=""
                        className="h-64 w-full object-cover transition duration-500 rounded-xl group-hover:scale-105 sm:h-72" />

                    <div className="flex justify-between items-center">

                        <div className="h-full">

                            <div className="text-xl text-gray-900 font-semibold">

                                {title}

                            </div>

                            <div className="text-sm text-gray-500">

                                {location}

                            </div>

                            <div className="text-sm text-gray-500">

                                {typeName}

                            </div>

                        </div>

                        <div className='flex flex-col justify-between gap-2 h-full'>

                            <div className='text-white text-sm w-max px-1.5 py-0.5 bg-green-800 rounded-md flex items-center self-end'>

                                <div>
                                    {RatingScore}
                                </div>

                                <StarIcon fontSize='' />

                            </div>

                            <div className="font-bold">$ {cost}</div>

                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full justify-between">


                    <Link to={`/viewproperty/${_id}`} state={{ data: props.data }} className='w-max h-max text-center text-sm py-1 px-1 rounded-sm bg-gradient-to-tr from-green-500 to-[#166534]/90 text-white'>
                        View listing
                    </Link>

                    <div className="flex gap-5 w-max">

                        {/* <button onClick={handleEditOpen}>
                            <EditIcon className='text-slate-500 hover:text-black transition-all ease-in-out duration-300' />
                        </button> */}

                        <Modal
                            open={openEdit}
                            onClose={handleEditClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className='flex items-center justify-center'
                        >
                            <div className='p-7 bg-white rounded-md shadow-lg w-[95%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%]'>

                                <div className='text-lg'>Edit Listing</div>

                                {/* write edit form */}

                                <div className='flex flex-col gap-2'>



                                </div>

                            </div>
                        </Modal>

                        <button onClick={handleDeleteOpen}>
                            <DeleteIcon className='text-slate-500 hover:text-red-600 transition-all ease-in-out duration-300' />
                        </button>

                        <Modal
                            open={openDelete}
                            onClose={handleDeleteClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className='flex items-center justify-center'
                        >

                            <div className='p-7 bg-white rounded-md shadow-lg w-[95%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%] flex flex-col gap-2'>

                                Confirm to delete

                                <div className="flex gap-2">
                                    <button onClick={handleDelete} className='w-full py-1 text-center bg-red-500 text-white rounded'>Delete</button>
                                    <button onClick={handleDeleteClose} className='w-full py-1 text-center duration-300 hover:bg-slate-200 rounded'>Cancel</button>
                                </div>

                            </div>

                        </Modal>

                    </div>

                </div >

            </div >

        </>
    )
}

export default ListingItems