import ApiKey from "@/components/apikey/ApiKey";
import UserChartContainer from "../chart/UserChartContainer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import Pricing from "@/components/section/pricing/pricing";

export default async function UserView() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session?.user?.subscription?.id ? (
        <>
          <UserChartContainer />
          
          <p className="mt-4 text-xl leading-8 text-black dark:text-white">
            API Quota: 2000
          </p>
          <p className="text-xl leading-8 text-black dark:text-white">
            Used: 972
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
