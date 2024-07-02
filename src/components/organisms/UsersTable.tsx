'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/atomic/button/Button'
import Dropdown from '@/components/atomic/dropdown/Dropdown'
import Table from '@/components/organisms/table/Table'
import TableBody from '@/components/organisms/table/TableBody'
import TableCell from '@/components/organisms/table/TableCell'
import TableHead from '@/components/organisms/table/TableHead'
import TableRow from '@/components/organisms/table/TableRow'
import DeleteIcon from "@/icons/trash-icon.svg"
// import { changeUserRole, deleteUser, searchUsers } from '@/app/actions/users'
import { changeUserRole, deleteUser } from '@/app/actions/users'
import customToast from '../atomic/toast/customToast'
import ConfirmationModal from '../molecules/confirmation-modal/ConfirmationModal'
import Pagination from '../molecules/pagination/Pagination'
import { useReactTable, getCoreRowModel, getPaginationRowModel, PaginationState, flexRender, createColumnHelper } from '@tanstack/react-table';
import Badge from '../atomic/badge/Badge'
import { useSession } from 'next-auth/react'
import AddUserModal from '../molecules/add-user-modal'
import InputField from '../atomic/input/InputField'
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import useDebounce from '@/hooks/useDebounce'
const colors = ['primary', 'red', 'green', 'grey', 'orange', 'white']

interface User {
    id: string;
    email: string;
    name: string;
    password: string | null;
    verifyToken: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    avatar: string | null;
    role: string;
    provider: string;

}
interface UsersTableProps {
    users: User[]
}

const UsersTable = ({ users: defaultUsers }: UsersTableProps) => {
    const session = useSession()
    const [users, setUsers] = useState<User[]>(defaultUsers)
    const [modalOpen, setModalOpen] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const [tobeDeletedUserId, setTobeDeletedUserId] = useState('')
    const columnHelper = createColumnHelper<User>()
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)
    const debouncedValue = useDebounce(search, 500)


    useEffect(() => {
        (async () => {
            if (!searched) {
                if (!debouncedValue && debouncedValue === '') {
                    setUsers(defaultUsers)
                    return
                }
                // const filteredUsers = await searchUsers(debouncedValue)
                // setUsers(filteredUsers)
                setSearched(true)
            }
        })()
    }, [debouncedValue])
    const columns = [
        columnHelper.accessor(row => row.name, {
            id: 'Name',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.email, {
            id: 'Email',
            cell: info => info.getValue(),
            header: () => <span>Email</span>,
            footer: info => info.column.id,
        }),

        columnHelper.accessor(row => row.role, {
            id: 'Role',
            cell: info => <Badge type='outline' color={colors[info.row.index % 6] as any}>{users[info.row.index].role}</Badge>,
            header: () => <span>Role</span>,
            footer: info => info.column.id,
        }),
        columnHelper.display({
            id: 'Actions',
            cell: info => {
                const user = users[info.row.index]
                return (<div className='flex justify-start gap-2'>
                    <Dropdown
                        id='role'
                        name='role'
                        value={user.role}
                        options={[{
                            value: 'ADMIN',
                            label: 'Admin',
                        },
                        {
                            value: 'USER',
                            label: 'User',
                        }]}
                        onChange={(value: string) => {
                            const user = users[info.row.index]
                            handleRoleChange(user.id, value)
                        }
                        }
                        className='!w-fit'
                    />

                </div>)
            },
            header: () => <span>Actions</span>,
        }),
    ]
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })
    const table = useReactTable({
        columns,
        data: users,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            pagination

        },
    });





    const handleRoleChange = async (userId: string, role: string) => {
        try {
            if (session.data?.user?.id === userId) {
                customToast.error('You cannot change your own role')
                return
            }
            if (role === 'ADMIN' && session.data?.user?.role !== 'ADMIN') {
                customToast.error('You cannot change a user to admin')
                return
            }
            await changeUserRole(userId, role)
            setUsers(users.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        role
                    }
                }
                return user
            }))
            customToast.success('Role updated successfully')
        } catch (error) {
            customToast.error('Failed to update role')
        }
    }

    const handleDelete = async (userId: string) => {
        try {
            if (session.data?.user?.id === userId) {
                customToast.error('You cannot delete your own account')
                return
            }
            await deleteUser(userId)
            setUsers(users.filter(user => user.id !== userId))
            customToast.success('User deleted successfully')
        } catch (error) {
            customToast.error('Failed to delete user')
        }
        finally {
            setTobeDeletedUserId('')
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const DeleteButton = <Button icon={<DeleteIcon />} size='md' onClick={() => {
        setModalOpen(true)
    }} className='!w-fit !p-2 !min-w-fit text-red-600 border-red-300 bg-red-100 hover:bg-red-200 dark:bg-button-background-dark dark:hover:bg-profile-modal-border-dark' variant='alert' label='' />


    return (
        <div className='h-full min-h-[100vh]'>
            {/* <div className='flex w-full justify-end my-4 '>
                <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                    id='search' value={search} onChange={(e) => {
                        setSearched(false)
                        setSearch(e.target.value)
                    }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2    ' customLeadingIconClassName='!left-[8px] !top-[14px] ' />
            </div> */}
            <div className='flex flex-col gap-4'>

                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div className='self-end flex flex-col gap-4'>

                    <Pagination
                        totalPages={Math.ceil(users.length / 5)}
                        previousButton
                        nextButton
                        previousButtonDisabled={!table.getCanPreviousPage()}
                        nextButtonDisabled={!table.getCanNextPage()}
                        onPreviousClick={() => { table.previousPage() }}
                        onNextClick={() => { table.nextPage() }}
                        onPageClick={(pageNumber) => {
                            table.setPagination({
                                pageIndex: pageNumber - 1,
                                pageSize: 5
                            })
                        }}
                    />
                    <Button label='Add User' className='w-fit self-end' variant='primary' onClick={() => setUserModal(true)} />
                </div>
            </div>
            <ConfirmationModal
                icon={
                    <div className='p-2 w-fit bg-gradient-to-b from-red-100 to-red-200  text-red-500
            rounded-[32px] border border-grey-200'>
                        <DeleteIcon />
                    </div>
                }
                isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Delete user?' description='This action is irreversible'>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setModalOpen(false)} />
                    <Button variant='alert' label='Delete User' onClick={() => {
                        handleDelete(tobeDeletedUserId)
                        setModalOpen(false)
                    }}
                    />
                </>
            </ConfirmationModal>
            {userModal && <AddUserModal
                onClose={() => setUserModal(false)}
            />}
        </div>
    )
}

export default UsersTable