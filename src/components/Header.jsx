import * as React from 'react';
import Building from '../assets/Image/pngegg.png';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
    const [place, setPlace] = React.useState('');

    const handleChange = (event) => {
        setPlace(event.target.value);
    };

    return (
        <>
            <div className=' bg-[#FFFFFF] select-none hidden'>
                <div className='flex justify-between px-10 py-7'>
                    <div>
                        <img className='w-10' src={Building} alt="Logo" />
                    </div>

                    <div className='flex gap-9'>
                        <Link>
                            <button className='border-2 border-[#4DD637] text-[#4DD637] px-5 py-1.5 font-semibold hover:shadow-md duration-300 text-sm'>
                                BOOK PLACE
                            </button>
                        </Link>
                        <Link>
                            <button className='bg-[#4DD637] text-sm text-white px-5 py-1.5 font-semibold hover:shadow-md duration-300'>
                                LIST PLACE
                            </button>
                        </Link>

                        <div className='flex px-5 font-semibold'>
                            <Link>
                                <button className='py-1 hover:text-[#4DD637] duration-200'>LOGIN</button>/
                            </Link>
                            <Link>
                                <button className='py-1 hover:text-[#4DD637] duration-200'>SIGNUP</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='h-12 justify-center w-full hidden'>
                    <div className='flex justify-center items-center h-full w-[50%] shadow-gray-300 shadow-lg rounded-full gap-3 p-1 border-2'>
                        <div className='flex w-full '>
                            <input type="text" className='bg-transparent px-3 py-2 outline-none border-r-2 w-full border-[#22CB5C]' placeholder='Search for Location...' />
                        </div>
                        <div className='border-r-2 h-full items-center flex border-[#22CB5C] px-2'>
                            <select className='px-2 outline-none '>
                                <option value="Male">India</option>
                                <option value="Male">America</option>
                                <option value="others">Africa</option>
                            </select>
                        </div>
                        <div className='flex items-center bg-[#22CB5C] rounded-full'>
                            <button className='p-1.5 text-white'><SearchIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header