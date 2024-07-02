// import { sendEmail } from "@/lib/mailer";
import { createTranslation } from '@/lib/i18n/server'
import { prisma } from '@/lib/prisma'
import { sendResetPasswordEmail } from '@/utils/sendEmail'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<unknown>> {
    try {
        const { t } = await createTranslation('auth')
        const { email } = (await req.json()) as {
            email: string
        }

        const user = await prisma.user.findFirst({
            where: { email: email.toLowerCase() },
        })

        if (!user) {
            throw new Error(t("error.userNotFound"))
        }
        const resetPasswordToken = await hash(user.email + user.password, 12)
        const resetPassword = await prisma.resetPassword.create({
            data: {
                email: user.email,
                token: resetPasswordToken
            }
        });
        await sendResetPasswordEmail({
            to: user.email,
            name: user.name,
            subject: 'Reset Password',
            token: resetPassword.token as string
        });        // await sendEmail("verifyEmail", user.email, user.id);
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
