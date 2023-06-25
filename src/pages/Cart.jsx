import React from 'react'
import CartComponent from '../components/CartComponent'
import Payment from '../assets/Image/visa.png'
import Paypal from '../assets/Image/paypal.png'

const Cart = () => {
    return (
        <>
            <div className='w-full xl:h-[87vh] flex flex-col lg:flex-row xl:items-center xl:px-10 py-5 duration-300'>

                <div className='lg:w-[67%] xl:w-[70%] h-full py-4 px-2'>

                    <div className='h-[63vh] lg:h-[85vh] xl:h-[77vh] overflow-y-auto px-2 md:px-2 lg:px-4'>
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                    </div>
                </div>


                <div className='lg:w-[30%] h-full px-4 md:px-10 lg:px-3 flex flex-col gap-5'>

                    <div className='text-xl px-1'>Confirm and Pay</div>
                    <img className='w-[60%] md:w-[30%] lg:w-[60%]' src={Payment} alt="" />
                    <div className='flex flex-col gap-1'>
                        <div className='text-xs font-semibold text-[#4DD637]'>CARDHOLDER’S NAME</div>
                        <input className='w-full px-3 rounded-lg border-2 border-[#4DD637] py-1.5 focus:outline-none text-[#4DD637]' placeholder='Your Name' type="text" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-xs font-semibold text-[#4DD637]'>CARD NUMBER</div>
                        <input className='w-full px-3 rounded-lg border-2 border-[#4DD637] py-1.5 focus:outline-none text-[#4DD637]' placeholder='xxxx xxxx xxxx xxxx' type="text" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-xs font-semibold text-[#4DD637]'>BILLING ADDRESS</div>
                        <input className='w-full px-3 rounded-lg border-2 border-[#4DD637] py-1.5 focus:outline-none text-[#4DD637]' placeholder='Your address' type="text" />
                    </div>
                    <div className='w-full flex gap-4'>
                        <div className='w-[50%] flex flex-col gap-1'>
                            <div className='text-xs font-semibold text-[#4DD637]'>CVV</div>
                            <input className='w-full px-3 rounded-lg border-2 border-[#4DD637] py-1.5 focus:outline-none text-[#4DD637]' type="text" />
                        </div>
                        <div className='w-[50%] flex flex-col gap-1'>
                            <div className='text-xs font-semibold text-[#4DD637]'>EXPIRATION DATE</div>
                            <input className='w-full px-3 rounded-lg border-2 border-[#4DD637] py-1.5 focus:outline-none text-[#4DD637]' type="date" />
                        </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <input className='scale-125 my-1 cursor-pointer' type="checkbox" />
                        <div className='text-sm'>I accept the terms & conditions and refund policy of the platform</div>
                    </div>
                    <button className='bg-[#4DD637] py-1.5 text-white rounded-md'>
                        Confirm & Pay Order <span>$500</span>
                    </button>
                    <div className='text-xs flex gap-2 items-center text-slate-400'>
                        <div>Powered by</div>
                        <img className='w-20' src={Paypal} alt="paypal" />
                        <div>for secure payments.</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart