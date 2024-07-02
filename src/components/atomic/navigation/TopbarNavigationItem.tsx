'use client'
import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface TopbarNavigationItemProps {
    title: string;
    link: string;
    icon?: React.ReactNode;
    selected?: boolean;
}

const TopbarNavigationItem = ({ title, link, icon, selected }: TopbarNavigationItemProps) => {
    const { t } = useTranslation('landing');
    return (
        <Link href={link} >
            <li tabIndex={1} className='focus:shadow-focus-primary dark:focus:bg-secondary-button-hover-dark focus:bg-grey-200 rounded-lg' >

                <div className={cn('flex flex-row  gap-2 justify-start items-center px-4 py-[10px] text-grey-600  hover:bg-grey-200  dark:hover:bg-secondary-button-hover-dark  dark:!text-profile-modal-text-dark ', selected ? "bg-grey-300 dark:bg-input-dark " : "")}>
                    {icon}
                    <p className={cn('text-sm font-medium leading-[20px] ', selected ? "!text-black dark:!text-white" : "")}>{t(title)}</p>
                </div>
            </li>
        </Link>
    )
}

export default TopbarNavigationItem