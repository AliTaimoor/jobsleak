import { cn } from '@/utils/cn';
import React from 'react'

interface TabItemProps {
    label: string;
    icon?: React.ReactNode;
    selected?: boolean;
    onClick: () => void;
}

const TabItem = ({ label, selected, onClick }: TabItemProps) => {


    return (
        <div>
            <div onClick={onClick} tabIndex={1} className={cn('flex justify-center cursor-pointer [&:focus+div]:hidden items-center py-4 px-2 text-grey-600  rounded-lg text-sm focus:shadow-focus-primary leading-5 hover:text-primary-600 ', selected ? "text-primary-600" : "")}>
                {label}
            </div>
            {selected && <div className='rounded-tl-sm rounded-tr-sm h-[2px] focus:hidden bg-primary-500' ></div>}
        </div>

    )
}

export default TabItem