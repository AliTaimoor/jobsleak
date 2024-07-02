import { fetchStrapiAPI } from '@/utils/strapi';
import BlogContent from '@/components/blog/BlogContent';
import React from 'react';
import platformConfig from '@/config/app-config';
import { Post, allPosts } from "contentlayer/generated"
import { Metadata } from 'next';
import LocalBlogContent from '@/components/blog/LocalBlogContent';
import { notFound } from 'next/navigation';
import renderSchematags from '@/lib/seo/structured-data';
import { authors } from '@/lib/content/content';

export interface PostWithAuthor extends Post {
    authorProps: {
        name: string;
        avatar: string;
    }
    otherPosts: PostWithAuthor[]
}
interface PostProps {
    params: {
        slug: string
    }
}

function getPostFromParams(params: PostProps["params"]): PostWithAuthor | null {
    const slug = params?.slug
    const post = allPosts.find((post: any) => post.slug.replace("/", "") === slug) as PostWithAuthor

    if (!post) {
        return null
    }
    const author = authors.filter(a => a.slug == post.author)[0]

    post.authorProps = {} as any
    post.authorProps.name = author.name
    post.authorProps.avatar = author.avatar



    const otherPosts = allPosts.filter((p: any) => p.slug !== post.slug && p.category === post.category).slice(0, 3) as PostWithAuthor[]

    otherPosts.forEach((p: any) => {
        const author = authors.filter(a => a.slug == p.author)[0]
        p.authorProps = {} as any
        p.authorProps.name = author.name
        p.authorProps.avatar = author.avatar
    })

    post.otherPosts = otherPosts
    return post
}

export async function generateMetadata({
    params,
}: PostProps): Promise<Metadata> {
    const post = getPostFromParams(params)

    if (!post) {
        return {}
    }

    return {
        title: post.title,
        description: post.description,

    }
}
interface SingleBlogViewModel {
    title: string;
    description: string;
    publishedAt: string;
    imageURL: string;
    author: {
        name: string;
        avatar: string;
    }
}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const SlugPage = async ({ params }: { params: { slug: string } }) => {

    const post = getPostFromParams(params)
    if (!post) {
        return notFound()
    }
    if (!platformConfig.features.blog.strapi_enabled) {
        return <LocalBlogContent post={post} />
    }
    const token = platformConfig.variables.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: {
            slug: {
                $eq: params.slug,
            },
        },
        populate: {
            author: {
                populate: ['avatar', 'name']
            },
            imageURL: { fields: ["url"] }
        }
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchStrapiAPI(path, urlParamsObject, options);


    const mappedData: SingleBlogViewModel = {
        title: responseData.data[0].attributes.title,
        description: responseData.data[0].attributes.description,
        publishedAt: responseData.data[0].attributes.publishedAt,
        imageURL: responseData.data[0].attributes.imageURL.data.attributes.url,
        author: {
            avatar: responseData.data[0].attributes.author.data.attributes.avatar.data.attributes.url,
            name: responseData.data[0].attributes.author.data.attributes.name
        }
    }

    return (
        <div className='max-w-[1440px] w-full mx-auto px-4 md:px-28' >
            {renderSchematags('Article', {
                title: mappedData.title,
                datePublished: mappedData.publishedAt,
                dateModified: mappedData.publishedAt,
                imageURL: mappedData.imageURL,
                slug: params.slug,
                author: {
                    name: mappedData.author.name,
                    avatar: mappedData.author.avatar
                }
            })}
            {mappedData && (
                <BlogContent data={mappedData} />
            )}

        </div>
    )
}

export default SlugPage