import { Message } from "ai"

export interface Chat extends Record<string, any> {
    id: string
    title: string
    createdAt: Date
    userId: string
    path: string
    messages: Message[]
    sharePath?: string
}

export type ServerActionResult<Result> = Promise<
    | Result
    | {
        error: string
    }
>

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface User {
    id: string;
    apikey: string;
    email: string;
    name: string;
    password: string | null;
    verifyToken: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    avatar: string | null;
    role: string;
    provider: string;
    subscription: {
        name: string;
        totalQuota: number;
        usedQuota: number;
    } | null
}

export interface Company {
    upstreamId: number;
    name: string;
    logo: string;
    website: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
}

export interface Job {
    id: string;
    upstreamId: number;
    extId?: string | null;
    company: Company;
    title: string;
    location?: string | null;
    types: string[];
    cities: string[];
    countries: string[];
    regions: string[];
    hasRemote?: boolean | null;
    published?: Date | null;
    description?: string | null;
    experienceLevel?: string | null;
    applicationUrl?: string | null;
    language?: string | null;
    clearenceRequired?: boolean | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
    salaryCurrency?: string | null;
}

export interface Job_Filter {
    creationDateStart?: Date;
    creationDateEnd?: Date;
    upstreamIdFrom?: number;
    upstreamIdTo?: number;
    company?: string;
    title?: string;
    location?: string;
    type?: string;
    city?: string;
    country?: string;
    region?: string;
    hasRemote?: boolean;
    publishedSince?: Date;
    publishedUntil?: Date;
    experienceLevel?: string;
    language?: string;
    clearenceRequired?: boolean;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
}

export type Last30DaysUsageResult = {
    date: Date;
    _count: number;
};

export type Last12MonthsUsageResult = {
    month: Date;
    _count: number;
};