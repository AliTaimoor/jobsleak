import Typography from '@/components/atomic/typography/Typography';
import React from 'react'

interface ChartCardProps {
    title: string;
    summary?: number | string;
    children: React.ReactNode;
}
const ChartCard = ({ title, summary, children }: ChartCardProps) => {
    return (
        <div className='shadow-sm  border border-grey-200 dark:border-profile-modal-border-dark p-6 rounded-2xl flex flex-col justify-stretch gap-6 dark:bg-profile-modal-background-dark'>
            <div>
                <Typography type='h3' className='text-sm  text-grey-600 leading-5'>{title}</Typography>
                {summary && <Typography type='p' className='text-2xl leading-8  text-black dark:text-white'>{summary}</Typography>}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ChartCard