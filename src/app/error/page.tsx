'use client'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ErrorPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    useEffect(() => {
        (async function () {
            const queryParams = new URLSearchParams(searchParams);
            const error = queryParams.get('error')
            customToast.error(error as string)

            setTimeout(() => {
                router.push("/login")
            })
        })()
    }, [])
    return (
        <div className="flex items-center justify-center min-h-screen bg-white py-48">
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
                    <div className=" text-3xl lg:text-3xl md:text-2xl mt-10">
                        Redirecting...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage