import React, { useContext, useEffect } from 'react'
import Items from '../components/Items'
import MainContext from '../context/MainContext'

const Property = () => {

    const { fetchProperty, propertyList } = useContext(MainContext)

    useEffect(() => {
        fetchProperty()
    }, [])

    return (
        <div className='py-10'>
            <div className='flex justify-center py-6 font-bold text-sm sm:text-lg lg:text-2xl '>Properties in North Carolina, USA</div>
            <div className='grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-10 py-3'>

                {
                    propertyList?.map((data) => {
                        return (
                            <Items key={data._id} data={data} />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Property