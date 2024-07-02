import Badge from '@/components/atomic/badge/Badge'
import React from 'react'

interface DashboardCardProps {
    title: string
    quantity: number
    increase: number
}

const DashboardCard = ({ title, quantity, increase }: DashboardCardProps) => {

    return (
        <div className='py-5 px-6 rounded-2xl bg-white flex flex-col justify-start gap-3 border border-grey-200
        dark:bg-card-dark dark:border-profile-modal-border-dark'>
            <p className='text-sm font-normal leading-5 text-grey-600 dark:text-sidebar-icon-dark'>{title}</p>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl leading-8 text-black dark:text-white'>{quantity}</h1>
                <Badge type='outline' color='green' size='md'>
                    {increase}%
                </Badge>
            </div>
        </div>
    )
}

export default DashboardCard