import { cn } from '@/utils/cn';
import React from 'react'
import CrossMarkIcon from "@/icons/cross-mark.svg";
import { VariantProps, cva } from 'class-variance-authority';


const chip = cva("w-fit cursor-pointer flex flex-row justify-center gap-1 items-center text-sm leading-5 font-normal", {
    "variants": {
        "size": {
            "sm": "px-1.5 py-0.5",
            "md": "px-3 py-1.5",
            "xs": "px-1 py-0.5"
        },
        "type": {
            "outline": "border rounded-lg",
            "filled": "rounded-lg",
            "clear": "!bg-transparent"
        },
        "color": {
            "primary": "text-primary-600 border-primary-300 bg-primary-100",
            "grey": "text-grey-600 border-grey-300 bg-grey-100",
            "red": "text-red-600 border-red-300 bg-red-100",
            "green": "text-green-600 border-green-300 bg-green-100",
            "orange": "text-orange-600 border-orange-300 bg-orange-100",
            "white": "text-grey-600  border-none bg-white"
        }
    },
    defaultVariants: {
        "color": "primary",
        "type": "filled",
        "size": "md"
    }
})


interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "color">, VariantProps<typeof chip> {
    includeClose?: boolean;
    onCloseIconClick?: () => void;
}


const Chip = ({ size = "md", children, type, color, includeClose, onCloseIconClick, ...additionalProps }: ChipProps) => {

    const hoverBg: Record<string, string> = {
        "primary": "hover:bg-primary-200",
        "grey": "hover:bg-grey-200",
        "red": "hover:bg-red-200",
        "green": "hover:bg-green-200",
        "orange": "hover:bg-orange-200",
        "white": "hover:bg-grey-200"
    }


    return (
        <div className={cn(chip({ size, color, type }))} {...additionalProps}>
            <>
                {children}
                {includeClose && <span className={hoverBg[color ?? "primary"]} onClick={onCloseIconClick}><CrossMarkIcon className='w-4 h-4' /> </span>}
            </>
        </div>
    )
}

export default Chip;