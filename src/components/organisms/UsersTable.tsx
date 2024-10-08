"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/atomic/button/Button";
import Dropdown from "@/components/atomic/dropdown/Dropdown";
import Table from "@/components/organisms/table/Table";
import TableBody from "@/components/organisms/table/TableBody";
import TableCell from "@/components/organisms/table/TableCell";
import TableHead from "@/components/organisms/table/TableHead";
import TableRow from "@/components/organisms/table/TableRow";
import DeleteIcon from "@/icons/trash-icon.svg";
// import { changeUserRole, deleteUser, searchUsers } from '@/app/actions/users'
import { changeUserRole, deleteUser } from "@/app/actions/users";
import customToast from "../atomic/toast/customToast";
import ConfirmationModal from "../molecules/confirmation-modal/ConfirmationModal";
import Pagination from "../molecules/pagination/Pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Badge from "../atomic/badge/Badge";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types";
import AddUserModal from "../molecules/add-user-modal";
import InputField from "../atomic/input/InputField";
import MagnifyingGlass from "@/icons/magnifying-glass.svg";
import useDebounce from "@/hooks/useDebounce";
import SettingsIcon from "@/icons/SettingsIcon";
import EditUser from "../molecules/edit-user/EditUser";
const colors = ["primary", "red", "green", "grey", "orange", "white"];

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users: defaultUsers }: UsersTableProps) => {
  const session = useSession();
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [deleteUserModal, setDeleteUserModal] = useState<User | null>(null);
  const [userModal, setUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const columnHelper = createColumnHelper<User>();
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      if (!searched) {
        if (!debouncedValue && debouncedValue === "") {
          setUsers(defaultUsers);
          return;
        }
        // const filteredUsers = await searchUsers(debouncedValue)
        // setUsers(filteredUsers)
        setSearched(true);
      }
    })();
  }, [debouncedValue]);

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.role, {
      id: "Role",
      cell: (info) => (
        <Badge type="outline" color={colors[info.row.index % 6] as any}>
          {users[info.row.index].role}
        </Badge>
      ),
      header: () => <span>Role</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.subscription?.name, {
        id: "Plan",
        cell: (info) => info.getValue() ?? "None",
        header: () => <span>Plan</span>,
        footer: (info) => info.column.id,
      }),
    columnHelper.accessor((row) => row.apikey, {
      id: "ApiKey",
      cell: (info) => info.getValue(),
      header: () => <span>Api Key</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.verified, {
      id: "Verified",
      cell: (info) => (
        <Badge type="outline" color={users[info.row.index].verified ? "primary" : "red"}>
          {users[info.row.index].verified ? "Yes" : "No"}
        </Badge>
      ),
      header: () => <span>Verified</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      id: "Actions",
      cell: (info) => {
        const user = users[info.row.index];
        return (
          <div className="flex justify-start gap-2">
            <Button
              icon={<SettingsIcon />}
              size="md"
              onClick={() => {
                setEditUser(user);
              }}
              className="!w-fit !p-2 !min-w-fit border-red-300 bg-red-100 hover:bg-red-200 dark:bg-button-background-dark dark:hover:bg-profile-modal-border-dark"
              variant="alert"
              label=""
            />
            <Button
              icon={<DeleteIcon />}
              size="md"
              onClick={() => {
                setDeleteUserModal(user);
              }}
              className="!w-fit !p-2 !min-w-fit text-red-600 border-red-300 bg-red-100 hover:bg-red-200 dark:bg-button-background-dark dark:hover:bg-profile-modal-border-dark"
              variant="alert"
              label=""
            />
          </div>
        );
      },
      header: () => <span>Actions</span>,
    }),
  ];
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    columns,
    data: users,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      pagination,
    },
  });

  const handleDelete = async (userId: string) => {
    try {
      if (session.data?.user?.id === userId) {
        customToast.error("You cannot delete your own account");
        return;
      }
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      customToast.success("User deleted successfully");
    } catch (error) {
      customToast.error("Failed to delete user");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className="h-full min-h-[100vh]">
      {editUser && (
        <EditUser user={editUser} onClose={() => setEditUser(null)} />
      )}
      {/* <div className='flex w-full justify-end my-4 '>
                <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                    id='search' value={search} onChange={(e) => {
                        setSearched(false)
                        setSearch(e.target.value)
                    }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2    ' customLeadingIconClassName='!left-[8px] !top-[14px] ' />
            </div> */}
      <div className="flex flex-col gap-4">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="self-end flex flex-col gap-4">
          <Pagination
            totalPages={Math.ceil(users.length / 5)}
            previousButton
            nextButton
            previousButtonDisabled={!table.getCanPreviousPage()}
            nextButtonDisabled={!table.getCanNextPage()}
            onPreviousClick={() => {
              table.previousPage();
            }}
            onNextClick={() => {
              table.nextPage();
            }}
            onPageClick={(pageNumber) => {
              table.setPagination({
                pageIndex: pageNumber - 1,
                pageSize: 5,
              });
            }}
          />
          {/* <Button
            label="Add User"
            className="w-fit self-end"
            variant="primary"
            onClick={() => setUserModal(true)}
          /> */}
        </div>
      </div>
      <ConfirmationModal
        icon={
          <div
            className="p-2 w-fit bg-gradient-to-b from-red-100 to-red-200  text-red-500
            rounded-[32px] border border-grey-200"
          >
            <DeleteIcon />
          </div>
        }
        isOpen={deleteUserModal !== null}
        onClose={() => setDeleteUserModal(null)}
        title="Delete user?"
        description="This action is irreversible"
      >
        <>
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => setDeleteUserModal(null)}
          />
          <Button
            variant="alert"
            label="Delete User"
            onClick={() => {
              handleDelete(deleteUserModal!.id);
              setDeleteUserModal(null);
            }}
          />
        </>
      </ConfirmationModal>
      {userModal && <AddUserModal onClose={() => setUserModal(false)} />}
    </div>
  );
};

export default UsersTable;
