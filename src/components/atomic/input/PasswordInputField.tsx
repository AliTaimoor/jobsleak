'use client'
import React from 'react'
import InputField from './InputField'
import EyeIcon from '@/icons/eye-icon.svg'
import EyeSlashIcon from '@/icons/eye-slash-icon.svg'

interface PasswordInputFieldProps extends React.ComponentProps<typeof InputField> {

}
const PasswordInputField: React.FC<PasswordInputFieldProps> = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
        <InputField
            {...props}
            type={showPassword ? 'text' : 'password'}
            leadingIcon={null}
            trailingIcon={
                <span onClick={() => setShowPassword(!showPassword)} className='hover:cursor-pointer text-grey-400 dark:text-placeholder-dark'>
                    {showPassword ?
                        <EyeSlashIcon /> : <EyeIcon />}
                </span>
            }
        />
    )
}

export default PasswordInputField