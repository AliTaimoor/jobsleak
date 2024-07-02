import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Company } from '@/lib/types';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    return NextResponse.json({}, { status: 403 })
  }
  
  let apiUrl = 'https://jobdataapi.com/api/jobs/?max_age=1';

  try {
    while (true) {
      const response = await axios.get(apiUrl);
  
      const jobs = [];
      const companies: Company[] = [];
  
      for(const job of response.data.results) {
        if(!companies.find(c => c.upstreamId === job.company.id)) {
          const comp = job.company;
          const company: Company = {
            upstreamId: comp.id,
            name: comp.name,
            logo: comp.logo,
            website: comp.website_url,
            linkedin: comp.linkedin_url,
            twitter: comp.twitter_handle,
          };
          companies.push(company);
        }
  
        const j = {
          upstreamId: job.id,
          extId: job.ext_id,
          companyId: job.company.id,
          title: job.title,
          location: job.location,
          types: job.types.map((t: any) => t.name),
          cities: job.cities.map((c: any) => c.name),
          countries: job.countries.map((c: any) => c.name),
          regions: job.regions.map((r: any) => r.name),
          hasRemote: job.has_remote,
          published: new Date(job.published),
          description: job.description,
          experienceLevel: job.experience_level,
          applicationUrl: job.application_url,
          language: job.language,
          clearenceRequired: job.clearence_required,
          salaryMin: job.salary_min,
          salaryMax: job.salary_max,
          salaryCurrency: job.salary_currency
        };
  
        jobs.push(j);
        
      }
  
      const existingCompanies = await prisma.company.findMany({where: {upstreamId: {in: companies.map(c => c.upstreamId)}}, select: {upstreamId: true}});
      const newCompanies = companies.filter(c => existingCompanies.map(ec => ec.upstreamId).indexOf(c.upstreamId) === -1 );
      
      await prisma.company.createMany({data: newCompanies});
      await prisma.job.createMany({data: jobs});
  
      if(response.data.next) {
        apiUrl = response.data.next;
      }
      else break;
    } 
    res.status(200).json({ message: 'Data fetched and stored successfully' });
  }
  catch(e) {
    console.error(e);
    res.status(500).json({ message: e});
  }
}