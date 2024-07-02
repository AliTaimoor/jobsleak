'use server'
import { prisma } from "@/lib/prisma"

export async function getChat(id: string, userId: string) {
    const chat = await prisma.chat.findFirst({
        where: {
            id: id
        },
        include: {
            messages: true
        }
    })

    if (!chat || (userId && chat.userId !== userId)) {
        return null
    }
    return chat
}

export async function getChats(userId: string) {
    const chats = await prisma.chat.findMany({
        where: {
            userId: userId
        },
    })
    return chats;
}

export async function deleteChat(id: string) {
    await prisma.message.deleteMany({
        where: {
            chatId: id
        }
    });
    const chats = await prisma.chat.delete({
        where: {
            id: id
        }
    })
    return chats;
}

