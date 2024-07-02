import { Subscription } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface SessionUser {
        id: string;
        name: string;
        email: string;
        avatar?: string;
        emailVerified: boolean;
        subscription?: Subscription;
        createdAt: Date;
        updatedAt: Date;
        role: string;
        apikey?: string;
    }
    interface Session extends DefaultSession {
        user?: SessionUser;
        token?: JWT;
    }
}