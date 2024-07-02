'use client'
import customToast from '@/components/atomic/toast/customToast'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

const VerifyPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: session } = useSession()
    useEffect(() => {
        (async function () {
            const queryParams = new URLSearchParams(searchParams);
            const token = queryParams.get('token')
            if (!token) {
                throw new Error('Token not found')
            }
            if (!session?.user) {
                return router.push(`/login?token=${encodeURIComponent(token)}`)
            }
            try {
                const result = await fetch('/api/auth/verify', {
                    method: 'POST',
                    body: JSON.stringify({
                        token
                    })
                })

                if (result?.status === 200) {
                    const data = await result.json() as any
                    if (data?.error) {
                        customToast.error(data.error)
                    } else {
                        customToast.success('Email verified, redirecting to dashboard')
                        setTimeout(() => {
                            router.push('/dashboard')
                        }, 1000)
                    }
                } else {
                    customToast.error('Something went wrong')
                    return router.push('/')
                }

            } catch (error) {
                console.error(error)
            }
        })()
    }, []);
    return (
        <Suspense fallback="loading">
            <div className='flex min-h-full flex-col justify-center mt-10 sm:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    Verifying token...
                </div>
            </div>
        </Suspense>

    )
}

export default VerifyPage