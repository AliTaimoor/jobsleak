import platformConfig from "@/config/app-config";
import qs from "qs";

export function getStrapiURL(path = '') {
    return `${platformConfig.variables.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}


export async function fetchStrapiAPI(
    path: string,
    urlParamsObject = {},
    options = {}
) {
    try {
        // Merge default and user options
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ""}`
        )}`;

        // Trigger API call
        const response = await fetch(requestUrl, { cache: "no-cache", ...mergedOptions });
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw new Error(`Please check if your server is running and you set all the required tokens.`);
    }
}