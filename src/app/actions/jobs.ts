'use server'
import { prisma } from "@/lib/prisma"
import { Job_Filter } from "@/lib/types";

export async function deleteJob(jobId: string) {
  const job = await prisma.job.delete({
    where: {
      id: jobId
    },
  });
  return job;
}

export async function getJobs(pageIndex: number, filter?: Job_Filter) {
  
  if (filter) {
    let companiesIds: number[] = [];
    if(filter.company) {
      const data = await prisma.company.findMany({where: {name: {contains: filter.company, mode: "insensitive"}}, select: {upstreamId: true}});
      companiesIds = data.map(d => d.upstreamId);
    }
    const query = {
        AND: [
          filter.creationDateStart ? { creationDate: { gte: filter.creationDateStart } } : {},
          filter.creationDateEnd ? { creationDate: { lte: filter.creationDateEnd } } : {},
          filter.upstreamIdFrom ? { upstreamId: { gte: filter.upstreamIdFrom } } : {},
          filter.upstreamIdTo ? { upstreamId: { lte: filter.upstreamIdTo } } : {},
          filter.company ? { companyId: {in: companiesIds} } : {},
          filter.title ? { title: { contains: filter.title } } : {},
          filter.location ? { location: { contains: filter.location } } : {},
          filter.type ? { types: { has: filter.type } } : {},
          filter.city ? { cities: { has: filter.city } } : {},
          filter.country ? { countries: { has: filter.country } } : {},
          filter.region ? { regions: { has: filter.region } } : {},
          filter.hasRemote ? { hasRemote: filter.hasRemote } : {},
          filter.publishedSince ? { published: { gte: filter.publishedSince } } : {},
          filter.publishedUntil ? { published: { lte: filter.publishedUntil } } : {},
          filter.experienceLevel ? { experienceLevel: filter.experienceLevel } : {},
          filter.language ? { language: filter.language } : {},
          filter.clearenceRequired ? { clearenceRequired: filter.clearenceRequired } : {},
          filter.salaryMin ? { salaryMin: { gte: filter.salaryMin } } : {},
          filter.salaryMax ? { salaryMax: { lte: filter.salaryMax } } : {},
          filter.salaryCurrency ? { salaryCurrency: filter.salaryCurrency } : {},
        ].filter(Boolean),
      };
    const [jobsCount, jobs] = await Promise.all([
      prisma.job.count({
        where: query
      }),
      await prisma.job.findMany({
        where: query,
        include: {
          company: { select: { name: true, logo: true, website: true, upstreamId: true } }
        },
        orderBy: { creationDate: "asc" },
        skip: pageIndex * 100,
        take: 100
      })
    ])
    return {jobsCount: jobsCount, jobs: jobs};
  }
  else {
    const today = new Date();
    today.setDate(4);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const [jobsCount, jobs] = await Promise.all([
      prisma.job.count({
        where: { creationDate: { gte: today } }
      }),
      await prisma.job.findMany({
        where: { creationDate: { gte: today } },
        include: {
          company: { select: { name: true, logo: true, website: true, upstreamId: true } }
        },
        orderBy: { creationDate: "asc" },
        skip: pageIndex * 100,
        take: 100
      })
    ])
    return {jobsCount: jobsCount, jobs: jobs};
  }
}