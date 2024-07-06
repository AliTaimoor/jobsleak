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
  const company = searchParams.get("company");
  const type = searchParams.get("type");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const region = searchParams.get("region");
  const hasRemote = searchParams.get("hasRemote");
  const experienceLevel = searchParams.get("experienceLevel");
  const language = searchParams.get("language");
  const clearenceRequired = searchParams.get("clearenceRequired");
  const min_salary = searchParams.get("min_salary");
  const max_salary = searchParams.get("max_salary");
  const published_since = searchParams.get("published_since");
  const published_until = searchParams.get("published_until");
  const salary_currency = searchParams.get("salary_currency");
  const page = searchParams.get("page");

  const titles = title ? title.split('|OR|') : undefined;
  const locations = location ? location.split('|OR|') : undefined;


  let companiesIds: number[] = [];
  if (company) {
    const data = await prisma.company.findMany({ where: { name: { contains: company, mode: "insensitive" } }, select: { upstreamId: true } });
    companiesIds = data.map(d => d.upstreamId);
  }
  const query = {
    AND: [
      company ? { companyId: { in: companiesIds } } : {},
      title ? { OR: titles?.map(t => ({ title: { contains: t } })) } : {},
      location ? { OR: locations?.map(l => ({ location: { contains: l } })) } : {},
      type ? { types: { has: type } } : {},
      city ? { cities: { has: city } } : {},
      country ? { countries: { has: country } } : {},
      region ? { regions: { has: region } } : {},
      hasRemote ? { hasRemote: hasRemote === "true" } : {},
      published_since ? { published: { gte: new Date(published_since) } } : {},
      published_until ? { published: { gte: new Date(published_until) } } : {},
      experienceLevel ? { experienceLevel: experienceLevel } : {},
      language ? { language: language } : {},
      clearenceRequired ? { clearenceRequired: clearenceRequired === "true" } : {},
      min_salary ? { salaryMin: { gte: parseFloat(min_salary) } } : {},
      max_salary ? { salaryMax: { lte: parseFloat(max_salary) } } : {},
      salary_currency ? { salaryCurrency: salary_currency } : {},
    ].filter(Boolean),
  };
  const [jobsCount, jobs] = await Promise.all([
    prisma.job.count({
      where: query
    }),
    await prisma.job.findMany({
      select: {
        id: true,
        company: { select: { name: true, logo: true, website: true} },
        title: true,
        location: true,
        types: true,
        cities: true,
        countries: true,
        regions: true,
        hasRemote: true,
        published: true,
        description: true,
        experienceLevel: true,
        applicationUrl: true,
        language: true,
        clearenceRequired: true,
        salaryMin: true,
        salaryMax: true,
        salaryCurrency: true,
      },
      where: query,
      orderBy: { creationDate: "asc" },
      skip: (page ? parseInt(page) : 0) * 100,
      take: 100
    })
  ])

  await prisma.apiLog.create({
    data: {
      request: searchParams.toString(),
      timestamp: new Date(),
      userId: userId
    }
  });

  await prisma.subscription.update({ where: { id: subscription.id }, data: { usedQuota: { increment: 1 } } });
  return NextResponse.json({ count: jobsCount, jobs: jobs });
}
