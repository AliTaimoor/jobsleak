import React from "react";
import { getServerSession } from "next-auth";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { authOptions } from "@/lib/auth/authOptions";
import ChartContainer from "@/components/dashboard/chart/ChartContainer";
import { DashboardCards } from "@/components/dashboard/cards/DashboardCards";
import { Roles } from "@/lib/types";
import UserView from "@/components/dashboard/userview/UserView";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/organisms/UsersTable";

export default async function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = useFeatureFlag("newDashboard");
	const session = await getServerSession(authOptions);

	if(session?.user?.role === Roles.ADMIN) {
    const users = await prisma.user.findMany();

		return (
			<UsersTable users={users} />
			// <div>
			// 	<DashboardCards />
			// 	<ChartContainer />
			// </div>
		);
	}
	else {
		return <UserView />
	}

}
