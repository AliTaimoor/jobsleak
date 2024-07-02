import { defineDocumentType, makeSource } from "contentlayer/source-files"
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: "string",
        resolve: (doc: any) => `/${doc.slug}`,
    },
    slugAsParams: {
        type: "string",
        resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    readingTime: { type: 'json', resolve: (doc: any) => readingTime(doc.body.raw) },
} as const;

export const Page = defineDocumentType(() => ({
    name: "Page",
    filePathPattern: `pages/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
        },
    },
    computedFields,
}))

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `posts/**/*.mdx`,
    contentType: "mdx",
    fields: {
        author: {
            type: "string",
            required: true
        },
        id: {
            type: "string",
            required: true,
        },
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
        },
        short_description: {
            type: "string",
        },
        publishedAt: {
            type: 'string',
            required: true
        },
        slug: {
            type: 'string',
            required: true
        },
        category: {
            type: 'string',
            required: true
        },
        imageURL: {
            type: 'string',
            required: false
        },
    },
    computedFields
}))

export default makeSource({
    contentDirPath: "./content",
    documentTypes: [Post, Page],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            rehypePrism as any,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
    },
})