import React, { useContext, useEffect } from 'react'
import Items from '../components/Items'
import MainContext from '../context/MainContext'
import ItemLoader from '../components/Loaders/ItemLoader'

const Property = () => {

    const { fetchProperty, propertyList, searchQuery, propertyLoading } = useContext(MainContext)

    useEffect(() => {
        fetchProperty()
    }, [])

    return (
        <div className='py-10'>

            {
                searchQuery ?
                    <div className='flex justify-center py-6 font-bold text-sm sm:text-lg lg:text-2xl '>Properties in {searchQuery}</div>
                    : null
            }

            {
                propertyLoading ?

                    <div className='grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-10 py-3'>

                        <ItemLoader/>
                        <ItemLoader/>
                        <ItemLoader/>
                        <ItemLoader/>
                        <ItemLoader/>
                        <ItemLoader/>

                    </div> :

                    propertyList.length ?
                        <div className='grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-10 py-3'>

                            {
                                propertyList?.map((data) => {
                                    return (
                                        <Items key={data._id} data={data} />
                                    )
                                })
                            }
                        </div>
                        :
                        <div className='flex justify-center py-6 font-bold text-sm sm:text-lg lg:text-2xl'>No properties found for your search.</div>
            }



        </div >
    )
}

export default Property