'use client'
import React from 'react'
import Button from '@/components/atomic/button/Button'
import { useRouter } from 'next/navigation'
import Typography from '@/components/atomic/typography/Typography'
import ArrowLeftIcon from "@/icons/arrow-left-icon.svg"
const NotFoundPage = () => {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 bg-white dark:bg-black py-48">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-12">
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Typography type='h1' className='!text-primary-500 font-semibold text-[40px] lg:text-[100px] leading-none   '>404</Typography>
                        <Typography type='p' className='text-neutral-600 text-base leading-[26px] max-w-[360px] text-center dark:text-profile-modal-text-dark' >Sorry, the page you are looking for doesn’t exist or has been moved.</Typography>
                    </div>
                    <Button variant='secondary' size='md' label='Go back' className='dark:text-white' icon={<ArrowLeftIcon />} onClick={() => router.back()} />
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage