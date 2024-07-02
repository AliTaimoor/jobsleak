import { authOptions } from "@/lib/auth/authOptions";
import { type NextRequest } from 'next/server'
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {

  const apiKey = req.headers.get("ApiKey");
  let userId: string;

  if (!apiKey) {
    const data = await getServerSession(authOptions);

    if (!data?.user) {
      return NextResponse.json({ message: "Either use an API key or login to fetch jobs" }, { status: 403 })
    }
    userId = data.user.id;
  }
  else {
    const user = await prisma.user.findFirst({ where: { apikey: apiKey }, select: { id: true } });
    if (!user) {
      return NextResponse.json({ message: "Invalid user. Please contact support." }, { status: 403 });
    }
    userId = user.id;
  }

  const subscription = await prisma.subscription.findFirst({ where: { userId: userId }, select: { id: true, totalQuota: true, usedQuota: true } });

  if (!subscription) {
    return NextResponse.json({ message: "Subscription not found" }, { status: 400 });
  }

  if (subscription.usedQuota >= subscription.totalQuota) {
    return NextResponse.json({ message: "Quota exceeded" }, { status: 429 });
  }

  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const max_age = searchParams.get("max_age");
  const min_salary = searchParams.get("min_salary");
  const published_since = searchParams.get("published_since");
  const published_until = searchParams.get("published_until");
  const salary_currency = searchParams.get("salary_currency");
  const page = searchParams.get("page");

  const titles = title ? title.split('|OR|') : undefined;
  const locations = location ? location.split('|OR|') : undefined;

  let from_date: Date | undefined = undefined;
  if (max_age) {
    from_date = new Date();
    from_date.setDate(from_date.getDate() - parseInt(max_age));
  }

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        title ? { OR: titles?.map(t => ({ title: { contains: t } })) } : {},
        location ? { OR: locations?.map(l => ({ location: { contains: l } })) } : {},
        max_age ? { published: { gte: from_date } } : {},
        min_salary ? { salaryMin: { gte: Number(min_salary) } } : {},
        published_since ? { published: { gte: new Date(published_since) } } : {},
        published_until ? { published: { lte: new Date(published_until) } } : {},
        salary_currency ? { salaryCurrency: salary_currency } : {},
      ].filter(Boolean),
    },
    take: 100,
    skip: page ? (Number(page) - 1) * 100 : 0
  });

  await prisma.apiLog.create({
    data: {
      request: searchParams.toString(),
      timestamp: new Date(),
      userId: userId
    }
  });

  await prisma.subscription.update({ where: { id: subscription.id }, data: { usedQuota: { increment: 1 } } });

  return NextResponse.json(jobs);

}
