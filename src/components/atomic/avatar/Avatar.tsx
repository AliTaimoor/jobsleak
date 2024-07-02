import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image'
import React from 'react'


const avatar = cva("avatar", {
    variants: {
        size: {
            xs: "h-6 w-6",
            sm: "h-8 w-8",
            md: "h-10 w-10",
            lg: "h-12 w-12",
            xl: "h-16 w-16",
            "2xl": "h-20 w-20",
            "3xl": "h-24 w-24"
        },

    },
    compoundVariants: [{ size: "md" }],
    defaultVariants: {
        size: "md",
    },
})
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatar> {
    image: string;
    name: string;
}

const Avatar = ({ image, name, size = 'md', ...additionalProps }: AvatarProps) => {
    return (
        <div className='avatar' {...additionalProps}>
            <div className={cn('rounded-full', avatar({ size }))}>
                <Image
                    height={40}
                    width={40}
                    src={image}
                    alt={name}
                    className="object-cover   h-10 w-10  !m-0 !p-0  object-top rounded-full group-hover:scale-105 group-hover:z-30"
                />
            </div>
        </div>
    )
}

export default Avatar