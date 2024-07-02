// components/InputField.tsx
import React from 'react'
import ExclmationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn'
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  id: string
  placeholder?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  additionalProps?: any
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  customLeadingIconClassName?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', leadingIcon, trailingIcon, placeholder, onChange, className, error, id, ...additionalProps }) => {
  return (
    <div className="form-control  w-full ">
      {label &&
        <label className="label text-sm text-black dark:text-white">
          <span className="label-text">{label}</span>
        </label>
      }
      <div className='flex relative'>
        {leadingIcon && <div className={cn('absolute left-[16px] top-[11px] text-black dark:text-placeholder-dark ', additionalProps.customLeadingIconClassName)}>{leadingIcon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(` outline-none  dark:bg-gray-800 text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border border-solid
                    border-grey-300 hover:border-grey-400 
                    dark:bg-input-dark
                    dark:border-input-border-dark dark:text-grey-200
                    dark:placeholder:text-placeholder-dark
                    disabled:bg-grey-100 text-sm
                    shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out`,
            { "pl-11": !!leadingIcon },
            { "pr-11": !!trailingIcon },
            { "!border-red-500 ": error },
            className)}
          name={name}
          id={id}
          onChange={onChange}
          {...additionalProps}
        />
        {trailingIcon && <div className='absolute right-4 top-[15px]  text-black dark:text-placeholder-dark'>{trailingIcon}</div>}
      </div>

      {error &&
        <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
          <ExclmationIcon />
          <p className='text-sm leading-5'>{error}</p>
        </div>}
    </div>
  )
}

export default InputField
