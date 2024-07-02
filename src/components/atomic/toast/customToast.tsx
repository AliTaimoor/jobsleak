// customToast.js
import { toast } from 'react-toastify'
import React from 'react'

import AlertIcon from '@/icons/AlertIcon'
import CheckCircleIcon from "@/icons/CheckCircleIcon.svg"
import WarningIcon from "@/icons/WarningIcon.svg"
const defaultToastId = "default-toast-id"
const customToast = {
    success(msg: string, options = {}) {
        return toast.success(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-success ',
            icon: <CheckCircleIcon />,
            closeButton: false,
            ...options,
        })
    },
    error(msg: string, options = {}) {
        return toast.error(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-error text-red-200',
            icon: <AlertIcon />,
            closeButton: false,
            ...options,

        })
    },
    warn(msg: string, options = {}) {
        return toast.warn(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-info',
            closeButton: false,
            icon: <WarningIcon />,
            ...options,
        })
    }
}
export default customToast
