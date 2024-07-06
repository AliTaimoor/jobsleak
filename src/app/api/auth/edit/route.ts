import { authOptions } from '@/lib/auth/authOptions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<unknown>> {
  const data = await getServerSession(authOptions);

    if (!data?.user || data.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Only admin users can access this route" }, { status: 403 })
    }
  try {
    const { apikey, role, quota, used, userId } = (await req.json()) as {
      apikey: string
      role: string
      quota: number,
      used: number,
      userId: string
    }

    await prisma.user.update({where: {id: userId}, data: {apikey: apikey, role: role}});
    await prisma.subscription.update({where: {userId: userId}, data: {totalQuota: quota, usedQuota: used}});

    return NextResponse.json({
      message: "User updated successfully"
    })
  } catch (error: any) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500 }
    )
  }
}
