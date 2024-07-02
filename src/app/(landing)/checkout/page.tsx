"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
export default function CheckoutPage() {
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('loading');


    useEffect(() => {
        function delayedRedirect() {
            return setTimeout(() => {
                if (paymentStatus === 'paid') {
                    router.push('/account');
                } else {
                    router.push('/');
                }
            }, 4000);
        }

        const queryParams = new URLSearchParams(searchParams);
        const isSuccess = queryParams.get('success')
        const isCanceled = queryParams.get('canceled')

        if (isCanceled) {
            setPaymentStatus('canceled');
        } else if (isSuccess) {
            setPaymentStatus('paid');
        } else {
            router.push('/account');
            return;
        }
        const timeout = delayedRedirect();
        return () => {
            clearTimeout(timeout);
        };
    }, [pathname, searchParams]);



    return (
        <div className='flex min-h-full flex-col justify-center mt-10 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10'>
                    <h1>
                        {paymentStatus === 'paid'
                            ? '🥳 Payment Successful!'
                            : paymentStatus === 'canceled'
                                ? '😢 Payment Canceled'
                                : paymentStatus === 'error' && '🙄 Payment Error'}
                    </h1>
                    {paymentStatus !== 'loading' && paymentStatus === "paid" ? (<span className='text-center'>
                        You are being redirected to your root page... <br />
                    </span>) : (
                        <span className='text-center'>
                            You are being redirected to your account page... <br />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}