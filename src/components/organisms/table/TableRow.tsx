import React from 'react'
import TableCell from './TableCell';
interface TableRowProps {
    onRowClick?: () => void;
    children: React.ReactElement<typeof TableCell>[];
}
const TableRow = ({ onRowClick, children }: TableRowProps) => {
    return (
        <tr onClick={onRowClick} className='border-b-[1px] border-grey-200 dark:border-profile-modal-border-dark  '>
            {children}
        </tr>
    )
}

export default TableRow