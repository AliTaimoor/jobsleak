import JobsTable from "@/components/organisms/JobsTable";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const UsersPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  const today = new Date();
  today.setDate(4);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const [jobs, totalCount] = await Promise.all([
    prisma.job.findMany({
      where: { creationDate: { gte: today } },
      include: {
        company: {
          select: { name: true, logo: true, website: true, upstreamId: true },
        },
      },
      orderBy: { creationDate: "asc" },
      take: 100,
    }),
    prisma.job.count({
      where: { creationDate: { gte: today } },
    }),
  ]);

  console.log("TOTAL: ", totalCount);

  return <JobsTable jobs={jobs} total={totalCount} />;
};

export default UsersPage;
