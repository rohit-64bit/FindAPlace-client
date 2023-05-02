import * as React from 'react';
import Building from '../assets/Image/pngegg.png';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [place, setPlace] = useState('');

    const [navBarOpen, setNavBarOpen] = useState(false)
    const handleOpen = () => setNavBarOpen(true);
    const handleClose = () => setNavBarOpen(false);

    const handleChange = (event) => {
        setPlace(event.target.value);
    };

    return (
        <>
            <div className={navBarOpen ? 'bg-[#FFFFFF] select-none sticky z-10 top-0' : 'bg-[#FFFFFF] select-none'}>


                {/* nav for desktop */}

                <div className='hidden md:flex justify-between px-10 py-7'>
                    <Link to='/'>
                        <img className='w-10' src={Building} alt="Logo" />
                    </Link>

                    <div className='flex items-center gap-9'>
                        <Link to="/">
                            <button className='border-2 border-[#4DD637] text-[#4DD637] px-5 py-1.5 font-semibold hover:shadow-md duration-300 text-sm'>
                                BOOK PLACE
                            </button>
                        </Link>
                        <Link to="/listproperty">
                            <button className='bg-[#4DD637] text-sm text-white px-5 py-1.5 font-semibold hover:shadow-md duration-300'>
                                LIST PLACE
                            </button>
                        </Link>

                        <div className='flex gap-1 items-center px-5 font-semibold'>
                            <Link to="/login">
                                <button className='py-1 hover:text-[#4DD637] duration-200'>LOGIN</button>
                            </Link>
                            /
                            <Link to="/signup">
                                <button className='py-1 hover:text-[#4DD637] duration-200'>SIGNUP</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* nav for smaller devices */}

                <div className='flex md:hidden justify-between items-center p-4'>

                    <Link to='/'>
                        <img className='w-10' src={Building} alt="Logo" />
                    </Link>

                    <button onClick={navBarOpen ? handleClose : handleOpen} className='flex gap-1 flex-col'>
                        <div className={navBarOpen ? 'border-[3px] border-[#22CB5C] w-8 rounded-full rotate-45 translate-y-1 duration-300' : 'border-[3px] border-[#22CB5C] w-8 rounded-full duration-300'}></div>

                        {navBarOpen ? "" : <div className='border-[3px] border-[#22CB5C] w-8 rounded-full'></div>}

                        <div className={navBarOpen ? 'border-[3px] border-[#22CB5C] w-8 rounded-full -rotate-45 -translate-y-1 duration-300' : 'border-[3px] border-[#22CB5C] w-8 rounded-full duration-300'}></div>
                    </button>

                </div>
                {navBarOpen ?
                    <div className='w-full flex flex-col gap-2 py-5 px-5 border border-t-2 h-max shadow-lg'>
                        <button className='w-full py-1 text-center bg-[#22CB5C] text-white font-semibold'>
                            BOOK A PLACE
                        </button>
                        <Link to="/listproperty">
                            <button className='w-full py-1 text-center bg-white text-[#22CB5C] border-2 border-[#22CB5C] font-semibold'>
                                LIST A PLACE
                            </button>
                        </Link>
                        <hr />
                        <Link to="/login">
                            <div className='py-2'>LOGIN</div>
                        </Link>
                        <Link to="/signup">
                            <div className='py-2'>SIGNUP</div>
                        </Link>
                    </div>
                    : ""}


                {navBarOpen ? "" :
                    <div className='h-12 flex justify-center w-full my-1'>
                        <div className='flex justify-center items-center h-full w-[90%] md:w-[80%] lg:w-[50%] shadow-md rounded-full gap-3 p-1 border-2'>
                            <div className='flex w-full '>
                                <input type="text" className='bg-transparent px-3 py-2 outline-none w-full' placeholder='Search for Location...' />
                            </div>
                            <button className='flex items-center bg-[#22CB5C] rounded-full p-1.5 text-white'>

                                <SearchIcon />

                            </button>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default Header