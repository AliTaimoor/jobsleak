// import { sendEmail } from "@/lib/mailer";
import { prisma } from '@/lib/prisma'
import rateLimit from '@/utils/rate-limit';
import { sendWelcomeWaitingListEmail } from '@/utils/sendEmail'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request): Promise<NextResponse<boolean>> {
    let limit = null, remaining = null;
    try {
        const header = headers()
        const detectedIp = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
        console.log(detectedIp);
        const res = await limiter.check(5, detectedIp); // 10 requests per minute
        limit = res.limit;
        remaining = res.remaining;
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                message: 'You are being rate limited'
            }),
            { status: 429 }
        )
    }
    try {
        const { email } = (await req.json()) as {
            email: string
        }
        const waitingListUser = await prisma.waitlistUser.findFirst({
            where: {
                email
            }
        });
        if (waitingListUser) {
            return new NextResponse(
                JSON.stringify({
                    status: 'error',
                    message: 'You are already in the waiting list'
                }),

                {
                    status: 400,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString()
                    }
                }
            )
        }
        await prisma.waitlistUser.create({
            data: {
                email
            }
        })
        const result = await sendWelcomeWaitingListEmail({
            to: email,
            subject: 'Waiting List Confirmation'
        });
        return new NextResponse(
            JSON.stringify({
                status: result.success ? 'success' : 'error',
                data: result.data
            }),
            {
                status: 200, headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString()
                }
            }
        )
    } catch (error: any) {
        console.error(error)
        return new NextResponse(
            JSON.stringify({
                status: 'error',
                error: error,
                message: JSON.stringify(error),
                reason: "Something bad happened"
            }),
            {
                status: 500, headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString()
                }
            }
        )
    }
}
