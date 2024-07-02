import React from 'react'

interface IconButtonProps {
    icon: React.ReactNode
    onClick: () => void
    className?: string
}

const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
    return (
        <button onClick={onClick} className={`p-1 flex justify-center rounded-full items-center  hover:bg-gray-200  ${className}`}>{icon}</button>
    )
}

export default IconButton