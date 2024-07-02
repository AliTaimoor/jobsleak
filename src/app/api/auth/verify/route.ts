// app/api/verify-email.ts
// import { sendEmail } from '@/utils/sendEmail'
import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
    }

    try {


        const { token } = await req.json()
        const user = await prisma.user.findFirst({
            where: { verifyToken: token, verified: false },
        })

        if (!user) {
            throw new Error('Error on verifying user')
        }
        if (user.verified) {
            throw new Error('User is already verified')
        }
        await prisma.user.update({
            where: { id: user.id },
            data: { verifyToken: undefined, verified: true }
        })

        return NextResponse.json({ user: { name: user.name, email: user.email } }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ error: error }, {
            status: 500
        })
    }
}
