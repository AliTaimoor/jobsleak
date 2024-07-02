import React from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody';

interface TableProps {
    children: (React.ReactElement<typeof TableHead> | React.ReactElement<typeof TableBody>)[];
}

const Table = ({ children }: TableProps) => {
    return (
        <div className='rounded-2xl bg-white border shadow-lg border-grey-200 dark:border-profile-modal-border-dark overflow-hidden  overflow-x-scroll no-scrollbar '>
            <table className='w-full table lg:table-fixed 	  '>
                {children}
            </table>
        </div>
    )
}

export default Table