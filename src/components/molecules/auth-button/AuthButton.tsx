import React from 'react'


interface AuthButtonProps {
    onClick: () => void
    content: string
    icon: React.ReactNode
}

const AuthButton = ({ onClick, content, icon }: AuthButtonProps) => {
    return (
        <button
            className="flex justify-center items-center duration-150 ease-in-out gap-2 px-5 py-3 w-full    border border-grey-300 rounded-lg bg-white  text-black
            hover:bg-grey-200
            focus:bg-white
            dark:hover:bg-input-hover-dark
            dark:bg-input-dark
            dark:border-input-border-dark
            focus:shadow-focus-primary
            "
            onClick={onClick}
            type="button"
        >
            {icon}
            <p className='text-black dark:text-grey-200 text-sm leading-5 font-medium '>{content}</p>
        </button>
    )
}

export default AuthButton;
