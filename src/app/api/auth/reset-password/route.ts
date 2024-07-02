// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { token, password } = (await req.json()) as {
      token: string,
      password: string
    }

    const resetPassword = await prisma.resetPassword.findFirst({
      where: { token },
    });
    if (!resetPassword) {
      throw new Error('No reset password found')
    }
    if (resetPassword.used) {
      throw new Error('This link has already been used')
    }

    if (resetPassword.createdAt < new Date(Date.now() - 3600000 * 24)) {
      throw new Error('This link has expired')
    }
    const user = await prisma.user.findFirst({
      where: { email: resetPassword.email },
    })

    if (!user) {
      throw new Error('No user found')
    }

    const hashed_password = await hash(password, 12)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed_password }
    })
    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500 }
    )
  }
}
