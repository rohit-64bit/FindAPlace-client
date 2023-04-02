import React from 'react'
import House from '../assets/Image/house.jpeg'

const Items = () => {
    return (
        <>
            <div className="max-w-md mx-auto duration-200">
                <a
                    href="#"
                    className="group relative block overflow-hidden border border-gray-100 rounded-md shadow-md">
                    <img
                        src={House}
                        alt=""
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />
                    <div
                        className="relative border-t border-gray-100 p-4 bg-white">
                        <h3 className="mt-4 text-lg text-gray-900 font-semibold">
                            5 Star Hotels
                        </h3>
                        <p className="mt-1.5 text-sm font-semibold">₹49,999</p>
                        <form className="mt-4">
                            <button
                                className="w-full rounded-md bg-[#4DD637] px-3.5 py-1.5 text-base font-semibold leading-7 text-white">
                                Add to Cart
                            </button>
                        </form>
                    </div>
                </a>
            </div>
        </>
    )
}

export default Items