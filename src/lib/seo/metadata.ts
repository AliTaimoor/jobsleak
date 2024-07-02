import { Metadata } from "next";

import { siteConfig } from "@/config/site-config";
import platformConfig from "@/config/app-config";
function getSeoMetadata(options?: Metadata): Metadata {
    return {
        metadataBase: new URL(platformConfig.variables.NEXT_URL),
        title: siteConfig.title,
        applicationName: siteConfig.applicationName,
        description: siteConfig.description,
        keywords: siteConfig.keywords,
        ...options,
        openGraph: {
            ...options?.openGraph,
            ...siteConfig.openGraph,
        },
        twitter: {
            ...siteConfig.twitter,
            ...options?.twitter
        },
    };
}


export default getSeoMetadata;