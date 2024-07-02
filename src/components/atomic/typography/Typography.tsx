import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react'



const typography = cva("text-black", {
    variants: {
        type: {
            h1: 'text-4xl leading-[48px] lg:leading-[64px] lg:text-5xl lg:font-semibold',
            h2: 'text-3xl font-black text-stone-950 lg:text-4xl leading-[64px]',
            h3: 'text-2xl leading-[32px] font-normal',
            h4: 'text-xl',
            h5: 'text-lg',
            h6: 'text-base ',
            p: 'text-base dark:text-sidebar-icon-dark'
        }
    },
    defaultVariants: {
        type: 'p'
    }
})

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement>, React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typography> {
    type: TypographyType
}
type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"

const Typography = ({ type, children, className, ...additionalProps }: TypographyProps) => {
    return React.createElement(type, { className: cn("text-black dark:text-white", typography({ type }), className), ...additionalProps }, children)
}

export default Typography;