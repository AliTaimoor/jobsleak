import React from 'react'
import DashboardCard from './DashboardCard'

export const DashboardCards = () => {
    const data = [
        {
            title: "Page views",
            quantity: 45329,
            increase: 21
        },
        {
            title: "Page views",
            quantity: 45329,
            increase: 21
        },
        {
            title: "Page views",
            quantity: 45329,
            increase: 21
        },
        {
            title: "Page views",
            quantity: 45329,
            increase: 21
        }
    ]
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 mb-8 '>
            {data.map((item, index) => (
                <DashboardCard key={index} title={item.title} quantity={item.quantity} increase={item.increase} />
            ))}
        </div>
    )
}
