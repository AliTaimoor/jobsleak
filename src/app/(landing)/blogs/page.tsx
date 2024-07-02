import PageHeader from '@/components/blog/PageHeader';
import React from 'react'
import BlogCard from '@/components/blog/BlogCard';
import getServerSideQueryClient from '@/react-query/server/queryClient';
import { blogPostsWithCategoryQueryKey } from '@/react-query/queryKeys';
import blogPostsWithCategoriesQueryFn from '@/react-query/server/queries/blogPostsWithCategories';
export interface BlogsViewModel {
    name: string;
    slug: string;
    articles: [
        {
            title: string;
            description: any;
            publishedAt: string;
            imageURL: string;
            short_description: string;
            slug: string;
            author: {
                name: string;
                avatar: string;
            };
        }
    ]
}


const BlogPage = async () => {
    const queryClient = await getServerSideQueryClient();

    await queryClient.prefetchQuery(
        {
            queryKey: blogPostsWithCategoryQueryKey(),
            queryFn: blogPostsWithCategoriesQueryFn,
        }
    )

    const mappedData = await queryClient.getQueryData<BlogsViewModel[]>(
        blogPostsWithCategoryQueryKey()
    )

    return (
        <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
            <div className='px-4 md:px-0'>
                <PageHeader />
            </div>
            {mappedData && mappedData.map((category: BlogsViewModel, index: any) => (
                <BlogCard loading={false} key={index} category={category} />
            ))}
        </div>
    )
}

export default BlogPage