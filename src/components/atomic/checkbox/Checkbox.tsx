import { cn } from '@/utils/cn';
import React from 'react'
import ExclmationIcon from '@/icons/exclamation-circle.svg'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    className?: string;
    id: string;
    name?: string;
    required?: boolean;
    error?: string;
}

const Checkbox = ({ checked, label, onChange, className, id, name, required, error, ...additionalProps }: CheckboxProps) => {
    return (
        <div>
            <div className='flex flex-row items-center justify-start gap-2 '>
                <input name={name} required={required} type="checkbox" id={id} onChange={onChange} checked={checked}
                    {...additionalProps}
                    className={cn("  text-primary-500 hover:cursor-pointer duration-150 ease-in-out  shadow-sm  focus:ring-0 focus:ring-offset-0  !outline-none rounded-[4px] border border-grey-300 dark:bg-input-dark dark:border-input-border-dark", className)} />
                <label htmlFor={id} className='text-sm leading-5 hover:cursor-pointer dark:text-white'>{label}</label>
            </div>
            {error &&
                <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
                    <ExclmationIcon />
                    <p className='text-sm leading-5'>{error}</p>
                </div>
            }
        </div>
    )
}

export default Checkbox