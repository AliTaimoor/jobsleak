'use client'
import BackIcon from '@/icons/BackIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { forwardRef } from 'react'
import Typography from '../atomic/typography/Typography'

interface BlogContentProps {
    data: any
    isLoading?: boolean
    content?: React.ReactNode
}

const BlogContent = forwardRef(function (props: BlogContentProps, ref: any) {
    const { data, isLoading, content } = props
    const router = useRouter()
    // Parse the MDX file via the useMDXComponent hook.
    if (isLoading) return (
        <>
            <div className='flex  mt-24 lg:mt-40  relative animate-pulse  '>
                <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                    <BackIcon />
                </div>
                <div className="flex flex-1 justify-center ">
                    <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg  bg-slate-700 text-center w-64 rounded-full h-8 '></h1>
                </div>
            </div>
            <div className="image flex justify-center mt-4 md:mt-16    animate-pulse relative w-full h-96 rounded-md bg-slate-700">

            </div>
            <div className="content mx-auto max-w-4xl my-8 md:my-16 h-[50vh] w-full  animate-pulse bg-slate-700 ">
            </div>
        </>
    )
    return (
        <div ref={ref}>
            <div className='flex  mt-24 lg:mt-48  justify-start gap-0 dark:text-white  '>
                <div className=' lg:absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-grey-200 dark:hover:bg-input-hover-dark' onClick={() => { router.back() }}>
                    <BackIcon />
                </div>
                <div className="flex flex-1 justify-center mr-[32px]">
                    <Typography type='h1' className='text-[32px] lg:text-[46px] text-stone-950 !dark:text-white !lg:font-semibold  leading-[130%] max-w-[300px] lg:max-w-3xl text-center'>{data.title}</Typography>
                </div>
            </div>
            <div className="image flex justify-center mt-10 md:mt-16 relative w-full max-h-[180px] md:max-h-[350px] lg:max-h-[450px] h-[1000px] rounded-md">
                <Image
                    src={`${data.imageURL}`} layout="fill"
                    objectFit="cover"
                    alt='image'
                    className='rounded-lg '
                />
            </div>
            <div className="content prose mx-auto max-w-[320px] md:max-w-[500px] lg:max-w-[720px] w-[100vw] text-base dark:text-white my-8 md:my-16 overflow-x-scroll no-scrollbar ">
                {content}
            </div>
        </div>
    )
})
BlogContent.displayName = 'BlogContent'
export default BlogContent