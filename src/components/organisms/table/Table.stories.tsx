import type { Meta } from '@storybook/react';
import React from 'react';
import Table from './Table';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableBody from './TableBody';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Organisms/Table',
    component: Table,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    decorators: [(story: any) => <div> {story()}</div>],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof Table>;

export default meta;


const TableWrapper = () => {
    return (
        <div className='w-full min-w-[500px] flex justify-center items-center h-96'>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Header 1</TableCell>
                        <TableCell>Header 2</TableCell>
                        <TableCell>Header 3</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Row 1, Cell 1</TableCell>
                        <TableCell>Row 1, Cell 2</TableCell>
                        <TableCell>Row 1, Cell 3</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Row 2, Cell 1</TableCell>
                        <TableCell>Row 2, Cell 2</TableCell>
                        <TableCell>Row 2, Cell 3</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Row 3, Cell 1</TableCell>
                        <TableCell>Row 3, Cell 2</TableCell>
                        <TableCell>Row 3, Cell 3</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export const ExampleTable = {
    render: () => <TableWrapper />
}