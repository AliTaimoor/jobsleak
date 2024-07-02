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
    id: number;
    ext_id: string;
    company: Company;
    title: string;
    location: string;
    types: [{ id: number; name: string }];
    cities: [{
        geonameid: number;
        asciiname: string;
        name: string;
        country: {
            code: string;
            name: string;
            region: {
                id: 2;
                name: string
            }
        };
        timezone: string;
        latitude: string;
        longitude: string
    }];
    countries: [{
        code: string;
        name: string;
        region: {
            id: number;
            name: string;
        }
    }];
    regions: [{
        id: number;
        name: string
    }];
    has_remote: boolean;
    published: string;
    description: string;
    experience_level: string;
    application_url: string;
    language: string;
    clearence_required: string;
    salary_min: string;
    salary_max: string;
    salary_currency: string;
}