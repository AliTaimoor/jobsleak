'use server'
import { prisma } from "@/lib/prisma"
import { compare, hash } from "bcryptjs";
import { User } from "@prisma/client";
export async function changeUserRole(userId: string, role: string) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: role
        }
    })
    return user;
}
export async function deleteUser(userId: string) {
    const user = await prisma.user.delete({
        where: {
            id: userId
        },
    })

    return user;
}

export async function updateUser(userId: string, data: any) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    })

    return user;
}
export async function updatePassword(userId: string, data: {
    currentPassword: string,
    newPassword: string
}) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }, select: {
            password: true
        }
    })
    console.log(user)
    if (!user) {
        throw new Error("User not found")
    }
    const valid = await compare(data.currentPassword, user.password as string)
    console.log(valid)
    if (!valid) {
        return {
            success: false,
            error: {
                field: "currentPassword",
                message: "Incorrect Password"
            }
        }

    }
    const hashed_password = await hash(data.newPassword, 12)
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashed_password
        }
    })
    return {
        success: true,
        data: updatedUser
    };
}