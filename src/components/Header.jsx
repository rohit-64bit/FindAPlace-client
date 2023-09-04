import * as React from 'react';
import Logo from '../assets/logo-main.png';
import LogoBW from '../assets/logo-bw.png';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ViewListIcon from '@mui/icons-material/ViewList';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { styled } from "@mui/system";
import MainContext from '../context/MainContext';
import { useEffect } from 'react';

const StyledButton = styled(Button)`
  border: 2px solid #166534;
  color: #166534;
  padding: 5px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Header = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const { userProfile, fetchUserProfile } = useContext(MainContext)

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


    const handleLogout = () => {

        localStorage.removeItem('auth-token')
        navigate('/')

    }

    const { name, email, contact } = userProfile;

    useEffect(() => {

        if (authToken) {
            fetchUserProfile()
        }

    }, [authToken])

    return (
        <>
            <div className={navBarOpen ? 'bg-[#FFFFFF] select-none sticky z-10 top-0' : 'bg-[#FFFFFF] select-none'}>

                {/* nav for desktop */}

                <div className='hidden md:flex justify-between px-10 py-7'>

                    <Link to='/' className='flex gap-2 items-center'>

                        <img className='w-44 ' src={Logo} alt="Logo" />

                    </Link>

                    <div className='flex items-center gap-2'>

                        <Link to="/listproperty">
                            <div className='border-2 hover:bg-[#166534]/5 text-black transition-all px-5 py-1.5 duration-300 text-sm rounded-full'>
                                List your property
                            </div>
                        </Link>


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

                                            <div className="h-14 gap-2 px-3 py-2 mb-2">
                                                <p className="font-semibold">Signed in as</p>
                                                <p className="font-semibold">{name}</p>
                                            </div>

                                            <Divider />

                                            <Link to="/profile">

                                                <div className='px-3 py-2 w-full gap-2 hover:bg-slate-100 flex items-center duration-300 rounded hover:shadow'>
                                                    {/* <EditIcon className='' style={{ fontSize: 25 }} /> */}

                                                    <p className='text-base'>Edit Profile</p>
                                                </div>

                                            </Link>

                                            <Link to="/order">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-slate-100 flex items-center duration-300 rounded hover:shadow'>

                                                    {/* <ViewStreamIcon className='' style={{ fontSize: 25 }} /> */}

                                                    <p className='text-base'>My Orders</p>
                                                </div>
                                            </Link>

                                            <Link to="/order">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-slate-100 flex items-center duration-300 rounded hover:shadow'>

                                                    {/* <ViewStreamIcon className='' style={{ fontSize: 25 }} /> */}

                                                    <p className='text-base'>Manage Listings</p>
                                                </div>
                                            </Link>

                                            <Link to="/help">
                                                <div className='px-3 py-2 w-full gap-2 hover:bg-slate-100 flex items-center duration-300 rounded hover:shadow'>

                                                    {/* <HelpIcon className='' style={{ fontSize: 25 }} /> */}

                                                    <p className='text-base'>Help & Support</p>
                                                </div>
                                            </Link>

                                            <button type='button' className='px-4 py-2 w-full gap-2 hover:bg-red-500 hover:text-white flex duration-300 items-center rounded hover:shadow' onClick={handleLogout}>

                                                {/* <LogoutIcon className='' style={{ fontSize: 24 }} /> */}

                                                <p className='text-base'>Logout</p>

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
                        <img className='w-32' src={Logo} alt="Logo" />
                    </Link>

                    <button onClick={navBarOpen ? handleClose : handleOpen} className='flex gap-1 flex-col'>

                        <div className={navBarOpen ? 'border-[2px] border-[#166534] w-8 rounded-full rotate-45 translate-y-1 duration-300' : 'border-[2px] border-[#166534] w-8 rounded-full duration-300'}></div>

                        {navBarOpen ? null : <div className='border-[2px] border-[#166534] w-8 rounded-full'></div>}

                        <div className={navBarOpen ? 'border-[2px] border-[#166534] w-8 rounded-full -rotate-45 -translate-y-1 duration-300' : 'border-[2px] border-[#166534] w-8 rounded-full duration-300'}></div>

                    </button>

                </div>

                {/* small device dropdown */}

                {
                    navBarOpen ?

                        <div className={navBarOpen ? 'w-full flex flex-col gap-2 py-5 px-5 border border-t-2 h-max shadow-lg fixed bg-white duration-300' : 'w-full flex flex-col gap-0 py-0 px-0 border border-t-2 h-max shadow-lg fixed bg-white duration-300'}>

                            {
                                authToken ?
                                    <>
                                        < Link to='/property' onClick={handleClose} className='w-full py-1 text-center border rounded' >
                                            Book a place
                                        </Link >

                                        <Link to="/listproperty" onClick={handleClose} className='w-full py-1 text-center border rounded'>
                                            List your place
                                        </Link>

                                        <hr className='mt-4' />

                                        <Link to="/profile" onClick={handleClose} className='flex gap-2 py-2'>

                                            <PersonIcon className='text-gray-700'/>

                                            Edit Profile
                                        </Link>

                                        <Link to="/order" onClick={handleClose} className='flex gap-2 py-2'>

                                            <LocalMallIcon className='text-gray-700'/>

                                            My Orders
                                        </Link>

                                        <Link to="/order" onClick={handleClose} className='flex gap-2 py-2'>

                                            <ViewListIcon className='text-gray-700'/>

                                            Manage Listings
                                        </Link>

                                        <Link to="/help" onClick={handleClose} className='flex gap-2 py-2'>

                                            <LiveHelpIcon className='text-gray-700'/>

                                            Help & Support
                                        </Link>

                                        <button
                                            onClick={
                                                () => {
                                                    handleClose()
                                                    handleLogout()
                                                }
                                            }
                                            className='flex gap-2 py-2'
                                        >

                                            <LogoutIcon className='text-gray-700'/>

                                            Logout

                                        </button>

                                    </> :
                                    <>
                                        < Link to='/property' onClick={handleClose} className='w-full py-1 text-center border rounded' >
                                            Book a place
                                        </Link >

                                        <Link to="/listproperty" onClick={handleClose} className='w-full py-1 text-center border rounded'>
                                            List your place
                                        </Link>

                                        <hr className='mt-4' />

                                        <Link to="/login" onClick={handleClose} className='flex gap-2 py-2'>

                                            <PersonIcon className='text-gray-700'/>

                                            Login
                                        </Link>

                                        <Link to="/signup" onClick={handleClose} className='flex gap-2 py-2'>

                                            <PersonAddAlt1Icon className='text-gray-700'/>

                                            Signup
                                        </Link>

                                    </>
                            }



                        </div>

                        : null
                }


                {/* search bar component */}

                {
                    navBarOpen ? null :

                        location.pathname !== '/' && location.pathname !== '/property' ?

                            null
                            :
                            <div className='h-12 flex justify-center w-full my-1'>
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