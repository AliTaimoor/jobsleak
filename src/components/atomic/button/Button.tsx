// components/Button.tsx
import LoadingIcon from '@/icons/LoadingIcon'
import { cn } from '@/utils/cn'
import React from 'react'
import { cva, type VariantProps } from "class-variance-authority";



const button = cva("min-w-fit cursor-pointer rounded-lg flex justify-center items-center gap-2 duration-150 ease-in-out  text-[14px] font-normal leading-[20px]  ", {
  variants: {
    variant: {
      primary: [
        "bg-primary-500",
        "text-white",
        "border-transparent",
        "hover:bg-primary-600",
        "focus:shadow-focus-primary",
        "disabled:bg-disabled "
      ],
      secondary:
        [
          'bg-white',
          'border',
          'border-grey-300',
          'dark:bg-input-dark',
          'dark:border-input-border-dark',
          'dark:hover:bg-secondary-button-hover-dark',
          'dark:text-white', 'disabled:bg-disabled',
          'focus:shadow-focus-primary'
          , 'hover:bg-grey-200',
          'shadow-sm',
          'text-black'
        ],
      tertiary: ['bg-grey-200', 'border-none', 'disabled:bg-grey-200', 'focus:shadow-focus-primary', 'hover:bg-grey-300', 'text-black'],
      alert: ['bg-red-500', 'disabled:bg-red-200', 'focus:shadow-focus-red', 'hover:bg-red-600', 'text-white'],
      success: ['bg-green-500', 'disabled:bg-green-200', 'focus:shadow-focus-green', 'hover:bg-green-600', 'text-white'],
      clear: ['hover:bg-grey-200', 'focus:bg-focus-primary', 'disabled:text-grey-400', 'text-black']
    },
    size: {
      sm: 'py-[6px] px-3',
      md: 'py-[10px] px-4',
      lg: 'py-[14px] px-5'
    },
  },
  compoundVariants: [{ variant: "primary", size: "md" }],
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});


interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "size">, VariantProps<typeof button> {
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  trailing?: boolean
}
const Button: React.FC<ButtonProps> = ({ icon = null, children, variant = 'primary', disabled, label, onClick, type, className, size, loading, trailing, ...props }) => {

  const content = label ? label : children;

  return (
    <button disabled={disabled || loading} className={cn(button({ variant, size }), className)} onClick={onClick} type={type} {...props}>
      {loading ? <LoadingIcon /> : null} {trailing ? <>{content ? <span className='mr-0'>{content}</span> : null}  {icon} </> : <>{icon} {content && <span className='ml-0'> {content} </span>}</>}
    </button>
  )
}

export default Button
