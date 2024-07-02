import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react'

interface NavigationItemProps {
    title: string;
    link: string;
    icon?: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}

const NavigationItem = ({ title, link, icon, selected, onClick }: NavigationItemProps) => {
    return (

        <Link href={link} onClick={() => { onClick && onClick() }} >
            <li tabIndex={1} className='focus:shadow-focus-primary rounded-lg' >

                <div className={cn('flex flex-row  gap-2 justify-start items-center px-2 py-3 text-grey-600   hover:bg-grey-200 dark:hover:bg-input-dark dark:text-sidebar-icon-dark     ', selected ? "bg-grey-200 dark:bg-navigation-item-selected dark:text-white  " : "")}>
                    {icon}
                    <p className={cn('text-sm font-normal leading-[20px]  ', selected ? "dark:text-white" : "")}>{title}</p>
                </div>
            </li>
        </Link>

    )
}

export default NavigationItem