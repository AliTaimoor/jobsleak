import Script from "next/script";
import React from 'react'
export type SEOSchemaType = "Article" | "WebPage" | "ProfilePage" | "SearchResultsPage";

export interface BlogSchemaOptions {
    title: string;
    datePublished: string;
    dateModified: string;
    imageURL: string;
    slug: string;
    author: {
        name: string;
        avatar: string;
    }
}


const renderArticleSchema = (options: BlogSchemaOptions) => {
    return `{
        "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": ${options.title}
    "image": [
        ${options.imageURL}
    ],
    "datePublished": "${options.datePublished}",
    "dateModified": "${options.dateModified}",
    "author": [{
        "@type": "Person",
    "name": "${options.author.name}",
    "url": "${options.author.avatar}"
    }
    ]
     }`;
};

function renderSchematags(schemaType: SEOSchemaType = "Article", options: BlogSchemaOptions) {
    let content = "";

    switch (schemaType) {
        case "Article":
            content = renderArticleSchema(options);
            break;
        default:
            break
    }


    return (
        <Script type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: content
            }}
        >
        </Script>
    )

}

export default renderSchematags;