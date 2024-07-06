import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
  try {
    const userId = '397b6b6d-58ba-4727-b505-7e0468a7822e';
    const startDate = new Date(Date.now() - 31536000000); // 12 months ago
    const endDate = new Date();
  
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      console.log("Doing: ", date.toDateString());
      const randomCount = Math.floor(Math.random() * 100); // random count between 0 and 100
      const dayLogs = [];
      for (let i = 0; i < randomCount; i++) {
        const apiLogData = {
          userId,
          timestamp: new Date(date.getTime() + Math.random() * 86400000), // random timestamp within the day
          request: getRandomRequest(),
        };
        dayLogs.push(apiLogData);
      }
      await prisma.apiLog.createMany({ data: dayLogs });
    }
    return NextResponse.json({ message: 'API log table seeded successfully' });
  }
  catch(e) {
    console.error(e);
    return NextResponse.json({ message: "Problem seeding" }, { status: 500 });
  }
};

const getRandomRequest = () => {
  const requests = ['/users', '/products', '/orders', '/categories', '/search', 'GET /users/123', 'POST /products'];
  return requests[Math.floor(Math.random() * requests.length)];
};
