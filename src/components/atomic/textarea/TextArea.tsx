import React from 'react'
import ExclamationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    name: string
    id: string
    placeholder?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error?: string
    additionalProps?: any
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, placeholder, onChange, error, id, ...additionalProps }) => {
    return (
        <div className="form-control">
            {label &&
                <label className="label text-sm text-black dark:text-white">
                    <span className="label-text">{label}</span>
                </label>
            }
            <textarea className={cn(`
            outline-none bg-white text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border border-solid
            border-grey-300 hover:border-grey-400 
             disabled:bg-grey-100 text-sm
             dark:bg-input-dark
             dark:border-input-border-dark
             dark:text-grey-200
             dark:placeholder:text-placeholder-dark
            shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out`,
                { "!border-red-500": error },
                additionalProps.className)}
                placeholder={placeholder}
                name={name}
                id={id}
                onChange={onChange}
                rows={4}
                {...additionalProps}></textarea>
            {error &&
                <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
                    <ExclamationIcon />
                    <p className='text-sm leading-5'>{error}</p>
                </div>}
        </div>
    )
}

export default TextArea