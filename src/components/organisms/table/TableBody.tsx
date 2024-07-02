import React from 'react'
import TableRow from './TableRow';

interface TableBodyProps {
    children: React.ReactElement<typeof TableRow>[];
}

const TableBody = ({ children }: TableBodyProps) => {
    return (
        <tbody className='!last:border-none'>{children}</tbody>
    )
}

export default TableBody