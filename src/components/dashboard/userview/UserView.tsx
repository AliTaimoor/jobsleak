import ApiKey from "@/components/apikey/ApiKey";
import UserChartContainer from "../chart/UserChartContainer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import Pricing from "@/components/section/pricing/pricing";
import { prisma } from "@/lib/prisma";
import { Last30DaysUsageResult, Last12MonthsUsageResult } from "@/lib/types";

export default async function UserView() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.subscription?.id) {
    return <Pricing showDescription />;
  }

  const usage = await prisma.$queryRaw<Last30DaysUsageResult[]>`
  SELECT 
    DATE_TRUNC('day', "timestamp") AS "date", 
    COUNT(*) AS "_count"
  FROM 
    "ApiLog"
  WHERE 
    "timestamp" > NOW() - INTERVAL '30 days'
    AND "userId" = ${session.user.id}
  GROUP BY 
    DATE_TRUNC('day', "timestamp")
  ORDER BY 
    "date" DESC;
`;

  const monthWiseUsage = await prisma.$queryRaw<Last12MonthsUsageResult[]>`
    SELECT 
      DATE_TRUNC('month', "timestamp") AS "month", 
      COUNT(*) AS "_count"
    FROM 
      "ApiLog"
    WHERE 
      "timestamp" > NOW() - INTERVAL '1 year'
      AND "userId" = ${session.user.id}
    GROUP BY 
      DATE_TRUNC('month', "timestamp")
    ORDER BY 
      "month" DESC;
    `;

  const dailyUsage = usage.map((m) => ({
    date: m.date,
    _count: Number(m._count),
  }));
  const monthlyUsage = monthWiseUsage.map((m) => ({
    month: m.month,
    _count: Number(m._count),
  }));

  return (
    <div>
      {session?.user?.subscription?.id ? (
        <>
          <UserChartContainer
            last30Days={dailyUsage}
            last12Months={monthlyUsage}
          />

          <p className="mt-4 text-xl leading-8 text-black dark:text-white">
            API Quota: {session.user.subscription.totalQuota.toLocaleString()}
          </p>
          <p className="text-xl leading-8 text-black dark:text-white">
            Used: {session.user.subscription.usedQuota.toLocaleString()}
          </p>

          <p className="my-4 text-2xl leading-8 text-black dark:text-white">
            You are on {session.user.subscription.name} plan
          </p>
          <ApiKey />
        </>
      ) : (
        <Pricing showDescription />
      )}
    </div>
  );
}
