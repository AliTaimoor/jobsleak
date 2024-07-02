'use client'
import { ToastContainer, cssTransition } from 'react-toastify'
import React from 'react'
interface ToastProviderProps {
    children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer
                position={"top-center"}
                autoClose={3000}
                hideProgressBar
                newestOnTop
                draggable={false}
                closeOnClick
                rtl={false}
                theme="colored"
                transition={cssTransition({
                    enter: 'zoomIn',
                    exit: 'zoomOut',
                    collapse: false,
                    collapseDuration: 0,
                })}
            />

        </>
    )
}
