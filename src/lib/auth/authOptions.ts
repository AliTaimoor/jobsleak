import { prisma } from '@/lib/prisma'
import { type User } from '@prisma/client'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import { sendVerificationEmail } from '@/utils/sendEmail'
import platformConfig from '@/config/app-config'
import { createTranslation } from '../i18n/server'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: platformConfig.variables.NEXT_AUTH_SECRET,

    providers: [
        CredentialsProvider({
            id: 'email',
            name: 'email',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com'
                },
            },
            async authorize(credentials) {
                if (!credentials?.email) {
                    return null
                }
                return {
                    email: "asdf",
                    name: "Asdf",
                    id: "asdfasdf"
                }
            },
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'password',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const { t } = await createTranslation('auth')
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                const user = (await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatar: true,
                        provider: true,
                        password: true,
                        role: true,
                    }
                })) as User
                if (!user) {
                    throw { message: t("error.userNotFound"), statusCode: 400 }
                }
                if (user.provider !== "credentials") {
                    throw { message: t("error.emailOtherProvider"), statusCode: 400 }
                }
                if (!user || !(await compare(credentials.password, user.password as string))) {
                    throw { message: t("error.incorrectEmailOrPassword"), statusCode: 401 }
                }
                return {
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    role: user.role,
                }
            }
        }),
        GoogleProvider({
            clientId: platformConfig.variables.GOOGLE_CLIENT_ID!,
            clientSecret: platformConfig.variables.GOOGLE_CLIENT_SECRET!,
        }),
        TwitterProvider({
            clientId: platformConfig.variables.TWITTER_CLIENT_ID!,
            clientSecret: platformConfig.variables.TWITTER_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: platformConfig.variables.GITHUB_ID as string,
            clientSecret: platformConfig.variables.GITHUB_SECRET as string
        }),
        FacebookProvider({
            clientId: platformConfig.variables.FACEBOOK_CLIENT_ID as string,
            clientSecret: platformConfig.variables.FACEBOOK_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (account?.provider === "google") {
                if (!profile) {
                    throw new Error("No profile found");
                }
                let user = await prisma.user.findUnique({
                    where: { email: profile?.email },
                });

                if (user) {
                    if (user.provider !== "google") {
                        throw new Error("An account with this email already exists");
                    }
                    else {
                        return true;
                    }
                } else {
                    user = await prisma.user.create({
                        data: {
                            name: profile.name as string,
                            email: profile.email as string,
                            avatar: (profile as any).picture as string,
                            verified: (profile as any).email_verified,
                            provider: "google"
                        }
                    })
                    if (!user.verified) {
                        await sendVerificationEmail({ to: user.email, name: user.name, subject: 'Verify Email', token: user.verifyToken as string });
                    }
                    return true;
                }
            }
            return true;
        },
        session: async ({ session, token }) => {

            const user = await prisma.user.findFirst({
                where: { id: token.id as string },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    role: true,
                    apikey: true
                }
            });
            const userSubscription = await prisma.subscription.findFirst({
                where: {
                    userId: user?.id
                },
            });
            return {
                ...session,
                user: {
                    id: token.id,
                    ...session.user,
                    ...user,
                    image: user?.avatar,
                    subscription: {
                        ...userSubscription
                    },
                },
                accessToken: token
            }
        },

        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.avatar = user.image
                token.randomKey = 'KG KEY'
                token.encoded = jwt.sign(
                    token,
                    platformConfig.variables.NEXTAUTH_SECRET!
                )
            } else {
                const user = await prisma.user.findFirst({
                    where: { email: token.email as string },
                    select: {
                        id: true,
                    }
                });
                console.log(user)
                token.id = user?.id
            }
            return await Promise.resolve(token)
        }
    },
    pages: {
        signIn: '/login',
        error: '/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request' // (used for check email message)
    }
}
