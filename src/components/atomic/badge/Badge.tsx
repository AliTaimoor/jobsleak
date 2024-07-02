import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react'


const badge = cva("w-fit  flex flex-row justify-center gap-1 text-sm leading-5 font-normal", {
    variants: {
        type: {
            outline: 'border rounded-lg',
            filled: 'rounded-lg',
            clear: '!bg-transparent'
        },
        size: {
            xs: 'px-1 py-0.5',
            sm: 'px-1.5 py-0.5',
            md: 'px-2 py-1.5',
        },
        color: {
            primary: 'text-primary-600 border-primary-300 bg-primary-100 dark:border-none dark:bg-[#32285A] dark:text-[#947BF8',
            grey: 'text-grey-600 border-grey-300 bg-grey-100 dark:border-none dark:bg-[#B0B0B0] dark:text-[rgba(245, 245, 245, 0.1)]',
            red: 'text-red-600 border-red-300 bg-red-100 dark:border-none dark:bg-[#352325] dark:text-red-600',
            green: 'text-green-600 border-green-300 bg-green-100 dark:border-none dark:text-green-600 dark:bg-[#26301D]',
            orange: 'text-orange-600 border-orange-300 bg-orange-100 dark:border-none dark:text-orange-600 dark:bg-[#3B2716]',
            white: 'text-grey-600  border-none bg-white dark:border-none dark-bg-[#B0B0B0] dark:text-[rgba(245, 245, 245, 0.1)]',
        }
    },
})

export interface BadgeProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof badge> {
}
const Badge = ({ size = "md", children, type, color, ...additionalProps }: BadgeProps) => {

    return (
        <div className={cn(badge({ type, color, size }))} {...additionalProps} >{children}</div>
    )
}

export default Badge