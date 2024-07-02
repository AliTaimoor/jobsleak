declare namespace NodeJS {
    export interface ProcessEnv {
        GOOGLE_ANALYTICS_ID: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        DATABASE_URL: string;
        DIRECT_URL: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_USER: string;
        POSTGRES_DB: string;
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
        RESEND_API_KEY: string;
        NEXT_PUBLIC_STRAPI_API_TOKEN: string;
        NEXT_PUBLIC_PAGE_LIMIT: number;
        NEXT_PUBLIC_STRAPI_API_URL: string;
        NEXT_URL: string;
        NEXT_PUBLIC_STRIPE_PRO_PLAN_ID: string;
        NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID: string;
        NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID: string;
        NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: string;
        NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY__PLAN_ID: string;
        NEXT_PUBLIC_STRIPE_ADVANCED_PLAN_ID: string;
    }
}