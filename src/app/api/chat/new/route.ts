import { authOptions } from '@/lib/auth/authOptions';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const json = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    console.log(session.user, json.chatTitle)

    const newChat = await prisma.chat.create({
        data: {
            title: json.chatTitle,
            userId: (session?.user as any).id
        }
    });
    return NextResponse.json({ message: 'Chat created', data: newChat });
}