export enum Plans {
  BASIC,
  PRO,
  PRO_PLUS
}
const platformConfig = {
  name: 'NextSaaSStack',
  stripe: {
    plans: [
      {
        "name": "Pro",
        "price_id": "price_1PVtlZKVzPXKk9Peb8cDMeZv"
      },
      {
        name: "Business",
        price_id: "price_1PVtlMKVzPXKk9PezDLgqHsF"
      },
      {
        name: "Premium",
        price_id: "price_1PVtjlKVzPXKk9PemGB6A5ZI"
      },
    ]
  },
  features: {
    blog: {
      "strapi_enabled": false,
    },
    payment_type: "one_time",
  },
  pricing: {
    plans: {
      basic: {
        name: "Basic",
        price: 29,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: "price_1PVtlZKVzPXKk9Peb8cDMeZv",
      },
      pro: {
        name: "Pro",
        price: 59,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: "price_1PVtlMKVzPXKk9PezDLgqHsF"
      },
      proPlus: {
        name: "Pro Plus",
        price: 99,
        description: "Ideal for getting started with desktop funnels and achieving your first successes.",
        planId: "price_1PVtjlKVzPXKk9PemGB6A5ZI"
      },
    },
    features: [
      {
        name: "2,000 API Calls",
        plans: [Plans.BASIC],
      },
      {
        name: "5,000 API Calls",
        plans: [Plans.PRO],
      },
      {
        name: "Unlimited API Calls",
        plans: [Plans.PRO_PLUS],
      }
    ]
  },
  variables: {
    NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
    NEXT_PUBLIC_PAGE_LIMIT: process.env.NEXT_PUBLIC_PAGE_LIMIT,
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_PUBLIC_STRAPI_API_URL_LOCAL: process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL,
    NEXT_PUBLIC_STRIPE_PRO_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    GOOGLE_ANALYTICS_ENABLED: process.env.GOOGLE_ANALYTICS_ENABLED,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_BUCKET_NAME: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME,
  }
}

export default platformConfig
