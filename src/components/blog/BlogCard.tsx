'use client'
import { BlogsViewModel } from '@/app/(landing)/blogs/page'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import siteUrls from '@/config/site-config'

interface BlogCardProps {
    key: string
    category: BlogsViewModel
    loading: boolean
}
const BlogCard = ({ key, category, loading }: BlogCardProps) => {

    if (loading) {
        return (
            <div className='category mb-20' key={key} >
                <div className="  px-5 py-1.5 animate-pulse rounded-3xl border justify-start items-start gap-2.5 inline-flex bg-slate-600">
                </div>
                <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                    {[0, 1, 2].map((article, index: any) => (
                        <Link key={index} className="card w-full dark:text-white  max-w-lg bg-base-100 dark:bg-card-dark h-96  col-span-12  md:col-span-6 lg:col-span-4  hover:cursor-pointer 
                        rounded-lg shadow-sm" href={`/`}>
                            <figure className='relative hidden  h-64 bg-slate-700 animate-pulse w-full' ></figure>
                            <div className="card-body animate-pulse pb-4">
                                <h2 className="card-title w-16  bg-slate-700" ></h2>
                                <p className='w-16 bg-slate-700'></p>
                                <div className='flex  items-center justify-start mt-4'>
                                    <div className='avatar'>
                                        <div className="w-10 rounded-full bg-slate-700 ">
                                        </div>
                                    </div>
                                    <p className='ml-2 w-16 bg-slate-700'></p>
                                    <p className='w-16 bg-slate-700'></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        )
    }
    return (
        <div className='category mb-14 lg:mb-20' key={key} >
            <div className=" 	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
            </div>
            <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                {category.articles.map((article, index: any) => (
                    <Link key={index} className="card w-full dark:text-white dark:bg-card-dark min-w-[324px] h-full   overflow-hidden max-w-lg  last:mr-4 lg:last:mr-0 bg-base-100 col-span-4  hover:cursor-pointer 
            rounded-[10px] shadow-sm" href={`${siteUrls.general.blog}/${article.slug}`}>
                        <figure className='relative hidden max-h-[176px]'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${article.imageURL}`} alt="Shoes" width={520} height={360} objectFit=' contain' /></figure>
                        <div className="px-6 pt-6 pb-2">
                            <h2 className="card-title text-2xl font-bold mb-2">{article.title}</h2>
                            <p className='text-neutral-600 dark:text-sidebar-icon-dark text-base'>{article.short_description}</p>
                            <div className='flex  items-center justify-start my-4 text-category-card-autor dark:text-sidebar-icon-dark text-xs'>
                                <div className='avatar'>
                                    <div className="w-6 rounded-full ">
                                        <img alt="Author name" src={`${(article.author?.avatar)}`} />
                                    </div>
                                </div>
                                <div className='flex justify-start gap-4'>
                                    <p className='ml-2 '>{article.author?.name ?? ""}</p>
                                    <p>{formatDate(article.publishedAt)}</p>
                                </div>

                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default BlogCard