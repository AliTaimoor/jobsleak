"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/atomic/button/Button";
import Table from "@/components/organisms/table/Table";
import TableBody from "@/components/organisms/table/TableBody";
import TableCell from "@/components/organisms/table/TableCell";
import TableHead from "@/components/organisms/table/TableHead";
import TableRow from "@/components/organisms/table/TableRow";
import DeleteIcon from "@/icons/trash-icon.svg";
import customToast from "../atomic/toast/customToast";
import ConfirmationModal from "../molecules/confirmation-modal/ConfirmationModal";
import Pagination from "../molecules/pagination/Pagination";
import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Badge from "../atomic/badge/Badge";
import { Job, Job_Filter } from "@/lib/types";
import SettingsIcon from "@/icons/SettingsIcon";
import EditUser from "../molecules/edit-user/EditUser";
import Link from "next/link";
import { deleteJob, getJobs } from "@/app/actions/jobs";
import JobFilter from "../molecules/job-filter/JobFilter";
const colors = ["primary", "red", "green", "grey", "orange", "white"];

interface JobsTableProps {
  jobs: Job[];
  total: number;
}

const JobsTable = ({
  jobs: defaultJobs,
  total: defaultTotal,
}: JobsTableProps) => {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);
  const [totalJobs, setTotalJobs] = useState(defaultTotal);
  const [deleteJobModal, setDeleteJobModal] = useState<Job | null>(null);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const columnHelper = createColumnHelper<Job>();
  const [filter, setFilter] = useState<Job_Filter>();
  const [openFilter, setOpenFilter] = useState(false);

  const columns = [
    columnHelper.accessor(
      (row) => ({ id: row.upstreamId, link: row.applicationUrl }),
      {
        id: "ID",
        cell: (info) => (
          <Link href={info.getValue().link as string}>
            {info.getValue().id}
          </Link>
        ),
        header: () => <span>ID</span>,
        footer: (info) => info.column.id,
      }
    ),
    columnHelper.accessor((row) => row.company, {
      id: "Company",
      cell: (info) => info.getValue().name,
      header: () => <span>Company</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.title, {
      id: "Title",
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.location, {
      id: "Location",
      cell: (info) => info.getValue(),
      header: () => <span>Location</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.hasRemote, {
      id: "Remote Friendly",
      cell: (info) => (
        <Badge
          type="outline"
          color={jobs[info.row.index].hasRemote ? "primary" : "red"}
        >
          {jobs[info.row.index].hasRemote ? "Yes" : "No"}
        </Badge>
      ),
      header: () => <span>Remote Friendly</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.published, {
      id: "Published",
      cell: (info) => (info.getValue() as Date).toDateString(),
      header: () => <span>Published</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.experienceLevel, {
      id: "Experience Level",
      cell: (info) => info.getValue(),
      header: () => <span>Experience</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.language, {
      id: "Language",
      cell: (info) => info.getValue(),
      header: () => <span>Language</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      id: "Actions",
      cell: (info) => {
        const job = jobs[info.row.index];
        return (
          <div className="flex justify-start gap-2">
            {/* <Button
              icon={<SettingsIcon />}
              size="md"
              onClick={() => {
                setEditJob(job);
              }}
              className="!w-fit !p-2 !min-w-fit border-red-300 bg-red-100 hover:bg-red-200 dark:bg-button-background-dark dark:hover:bg-profile-modal-border-dark"
              variant="alert"
              label=""
            /> */}
            <Button
              icon={<DeleteIcon />}
              size="md"
              onClick={() => {
                setDeleteJobModal(job);
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
    pageSize: 100,
  });

  const getThisPageJobs = useCallback(
    async (pageIndex: number, f?: Job_Filter) => {
      try {
        const j = await getJobs(pageIndex, f);
        setTotalJobs(j.jobsCount);
        setJobs(j.jobs);
      } catch (error) {
        customToast.error("Failed to fetch jobs");
      }
    },
    []
  );

  useEffect(() => {
    getThisPageJobs(pagination.pageIndex, filter);
  }, [pagination.pageIndex, filter]);

  const table = useReactTable({
    columns,
    data: jobs,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      pagination,
    },
    rowCount: totalJobs,
  });

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
      customToast.success("Job deleted successfully");
    } catch (error) {
      customToast.error("Failed to delete job");
    }
  };

  return (
    <div className="h-full min-h-[100vh]">
      {/* {editJob && (
        <EditUser user={editUser} onClose={() => setEditUser(null)} />
      )} */}
      {openFilter && (
        <JobFilter
          defaultFilter={filter}
          open={true}
          onClose={(f) => {
            if (f) {
              setFilter(f);
              setPagination({ ...pagination, pageIndex: 0 });
            }
            setOpenFilter(false);
          }}
        />
      )}
      <div className="flex justify-between mb-4">
        <span>Results: {totalJobs.toLocaleString()}</span>
        <Button
          type="button"
          variant="primary"
          label="Filter"
          className="px-8"
          onClick={() => setOpenFilter(true)}
        />
      </div>
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
            totalPages={Math.ceil(totalJobs / 100)}
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
          />
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
        isOpen={deleteJobModal !== null}
        onClose={() => setDeleteJobModal(null)}
        title="Delete job?"
        description="This action is irreversible"
      >
        <>
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => setDeleteJobModal(null)}
          />
          <Button
            variant="alert"
            label="Delete Job"
            onClick={() => {
              handleDelete(deleteJobModal!.id);
              setDeleteJobModal(null);
            }}
          />
        </>
      </ConfirmationModal>
    </div>
  );
};

export default JobsTable;
