import { Metadata } from "next";
import platformConfig from "./app-config";


interface SiteUrls {
    navbar: {
        [key: string]: {
            label: string;
            url: string;
        }
    },
    general: {
        [key: string]: any;
    }

}

const siteUrls: SiteUrls = {
    navbar: {
        pricing: {
            label: "navbar.pricing",
            url: "/#pricing",
        },
        features: {
            label: "navbar.features",
            url: "/#features",
        },
        blog: {
            label: "navbar.blog",
            url: "/blogs",
        },
        docs: {
            label: "navbar.docs",
            url: "https://docs.codepilot.dev",
        }
    },
    general: {
        home: '/',
        dashboard: '/dashboard',
        docs: "https://docs.Codepilot.dev",
        login: '/login',
        logout: '/logout',
        register: '/register',
        forgotPassword: '/forgot-password',
        resetPassword: '/reset-password',
        pricing: "/pricing",
        features: "/features",
        profile: '/profile',
        settings: '/settings',
        notFound: '/404',
        serverError: '/500',
        unauthorized: '/401',
        forbidden: '/403',
        contactUs: '/contact-us',
        aboutUs: '/about-us',
        privacyPolicy: '/privacy-policy',
        termsAndConditions: '/terms-and-conditions',
        faq: '/faq',
        blog: '/blogs',
        blogDetail: '/blog/:slug',
        category: '/category/:slug',
        tag: '/tag/:slug',
        search: '/search',
        cart: '/cart',
        checkout: '/checkout',
        orderSuccess: '/order-success',
        orders: '/orders',
        orderDetail: '/orders/:id'
    }
}

export const siteConfig: Metadata = {
    applicationName: 'Jobsleak',
    title: 'Jobsleak - Simple API for Jobs Data',
    description: 'Looking for a datasource to fill your job board',
    keywords: ['Jobs', 'data'],
    openGraph: {
        type: 'website',
        locale: 'en',
        siteName: 'Jobsleak',
        url: 'www.jobsleak.com',
        title: 'Jobsleak - Simple API for Jobs Data',
        description: 'Looking for a datasource to fill your job board',
        images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],
    },
    // twitter: {
    //     card: 'summary_large_image',
    //     creator: '@Landing Page',
    //     creatorId: '',
    //     description: "Ready to accelerate your development process?",
    //     images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],
    //     title: "Codepilot - Launch in days, not weeks."
    // },
};
export default siteUrls
