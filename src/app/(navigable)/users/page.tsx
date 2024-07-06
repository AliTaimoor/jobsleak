
import UsersTable from '@/components/organisms/UsersTable';
import { authOptions } from '@/lib/auth/authOptions';
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const UsersPage = async () => {

    const session = await getServerSession(authOptions);

    if (session?.user?.role !== 'ADMIN') {
        return redirect('/dashboard')
    }

    const users = await prisma.user.findMany({
        include: {
          subscription: { select: { totalQuota: true, usedQuota: true, name: true } },
        },
      });

    return (
        <UsersTable users={users} />
    )
}

export default UsersPage