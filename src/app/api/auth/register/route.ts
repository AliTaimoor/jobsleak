// import { sendEmail } from "@/lib/mailer";
import { createTranslation } from '@/lib/i18n/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/utils/sendEmail'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import {v4 as uuidv4} from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { t } = await createTranslation('auth')
    const { name, email, password } = (await req.json()) as {
      name: string
      email: string
      password: string
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      }
    })
    if (existingUser) {
      throw { message: t("error.userNotFound"), statusCode: 400 }
    }
    const hashed_password = await hash(password, 12)
    const apikey = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        apikey: apikey,
        verified: false,
        provider: 'credentials',
      }
    })

    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      subject: 'Confirm Account',
      token: user.verifyToken as string
    });
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email
      }
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
