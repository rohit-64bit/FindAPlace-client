import * as React from 'react';
import Building from '../assets/Image/pngegg.png';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const authToken = localStorage.getItem('auth-token')

    const [navBarOpen, setNavBarOpen] = useState(false)
    const handleOpen = () => setNavBarOpen(true);
    const handleClose = () => setNavBarOpen(false);

    const handleChange = (event) => {
        setPlace(event.target.value);
    };

    const anchor = 'left'
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogoutModalOpen = () => {

        localStorage.removeItem('auth-token')

    }

    return (
        <>
            <div className={navBarOpen ? 'bg-[#FFFFFF] select-none sticky z-10 top-0' : 'bg-[#FFFFFF] select-none'}>

                {/* nav for desktop */}

                <div className='hidden md:flex justify-between px-10 py-7'>

                    <Link to='/' className='flex gap-2 items-center'>
                        {/* <img className='w-10' src={Building} alt="Logo" /> */}
                        <div className='w-14 h-full bg-[#166534]'></div>
                        <div>
                            <div className='text-[#166534] font-bold text-lg'>BOOK A PLACE</div>
                            <div className='text-[#166534] font-thin text-sm'>EASY RENTAL</div>
                        </div>
                    </Link>

                    <div className='flex items-center gap-9'>

                        <div className="flex gap-4">

                            <Link to="/property">
                                <button className='border-2 border-[#166534] text-[#166534] px-5 py-1.5 font-semibold hover:shadow-md duration-300 text-sm'>
                                    BOOK PLACE
                                </button>
                            </Link>

                            <Link to="/listproperty">
                                <button className='bg-[#166534] border-2 border-[#166534] text-sm text-white px-5 py-1.5 font-semibold hover:shadow-md duration-300'>
                                    LIST PLACE
                                </button>
                            </Link>

                        </div>

                        {
                            authToken ?

                                <>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 35, height: 35 }} />

                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        onClick={handleMenuClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <div className=' bg-white px-2'>

                                            <Link to="/profile">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-[#166534] hover:text-white flex items-center duration-300 rounded hover:shadow'>
                                                    <EditIcon className='' style={{ fontSize: 25 }} />

                                                    <p className='font-semibold text-[17px]'>Edit Profile</p>
                                                </div>
                                            </Link>

                                            <Link to="/order">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-[#166534] hover:text-white flex items-center duration-300 rounded hover:shadow'>

                                                    <ViewStreamIcon className='' style={{ fontSize: 25 }} />

                                                    <p className='font-semibold text-[17px]'>My Orders</p>
                                                </div>
                                            </Link>

                                            <Link to="/help">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-[#166534] hover:text-white flex items-center duration-300 rounded hover:shadow'>

                                                    <HelpIcon className='' style={{ fontSize: 25 }} />

                                                    <p className='font-semibold text-[17px]'>Help & Support</p>
                                                </div>
                                            </Link>

                                            <button type='button' className='px-4 py-2 w-full gap-2 hover:bg-[#166534] hover:text-white flex duration-300 items-center rounded hover:shadow' onClick={handleLogoutModalOpen}>

                                                <LogoutIcon className='' style={{ fontSize: 24 }} />

                                                <p className='font-semibold text-[17px]'>Logout</p>

                                            </button>

                                        </div>

                                    </Menu>
                                </>
                                :
                                <div className='flex gap-1 items-center px-5 font-semibold'>
                                    <Link to="/login">
                                        <button className='py-1 hover:text-[#166534] duration-200'>LOGIN</button>
                                    </Link>
                                    /
                                    <Link to="/signup">
                                        <button className='py-1 hover:text-[#166534] duration-200'>SIGNUP</button>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>

                {/* nav for smaller devices */}

                <div className='flex md:hidden justify-between items-center p-4'>

                    <Link to='/'>
                        <img className='w-10' src={Building} alt="Logo" />
                    </Link>

                    <button onClick={navBarOpen ? handleClose : handleOpen} className='flex gap-1 flex-col'>
                        <div className={navBarOpen ? 'border-[2px] border-[#166534] w-8 rounded-full rotate-45 translate-y-1 duration-300' : 'border-[2px] border-[#166534] w-8 rounded-full duration-300'}></div>

                        {navBarOpen ? null : <div className='border-[2px] border-[#166534] w-8 rounded-full'></div>}

                        <div className={navBarOpen ? 'border-[2px] border-[#166534] w-8 rounded-full -rotate-45 -translate-y-1 duration-300' : 'border-[2px] border-[#166534] w-8 rounded-full duration-300'}></div>
                    </button>

                </div>

                {
                    navBarOpen ?

                        <div className='w-full flex flex-col gap-2 py-5 px-5 border border-t-2 h-max shadow-lg'>

                            < Link to='/' onClick={handleClose} className='w-full py-1 text-center bg-[#166534] text-white font-semibold' >
                                BOOK A PLACE
                            </Link >

                            <Link to="/listproperty" onClick={handleClose} className='w-full py-1 text-center bg-white text-[#166534] border-2 border-[#166534] font-semibold'>
                                LIST A PLACE
                            </Link>

                            <hr />

                            <Link to="/login" onClick={handleClose}>
                                <div className='py-2'>LOGIN</div>
                            </Link>

                            <Link to="/signup" onClick={handleClose}>
                                <div className='py-2'>SIGNUP</div>
                            </Link>

                        </div >

                        : null
                }


                {
                    navBarOpen ? null :

                        location.pathname !== '/' && location.pathname !== '/property' ?

                            null
                            : <div className='h-12 flex justify-center w-full my-1'>
                                <div className='flex justify-center items-center h-full w-[90%] md:w-[80%] lg:w-[50%] shadow-md rounded-full gap-3 p-1 border-2'>
                                    <div className='flex w-full '>
                                        <input type="text" className='bg-transparent px-3 py-2 outline-none w-full' placeholder='Search for Location...' />
                                    </div>
                                    <button className='flex items-center bg-[#208f4b] rounded-full p-1.5 md:p-2 text-white'>

                                        <SearchIcon />

                                        <div className='hidden md:block'>SEARCH</div>

                                    </button>
                                </div>
                            </div>
                }

            </div>
        </>
    )
}

export default Header