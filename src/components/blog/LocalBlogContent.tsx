'use client'
import { useMDXComponent } from 'next-contentlayer/hooks'
import React, { useRef } from 'react'
import BlogContent from './BlogContent'
import renderSchematags from '@/lib/seo/structured-data'
import { PostWithAuthor } from '@/app/(landing)/blogs/[slug]/page'
import SimilarBlogCard from './SimilarBlogCard'
import { motion, useScroll, useSpring } from 'framer-motion'

interface LocalBlogContentProps {
    post: PostWithAuthor
}
const LocalBlogContent = ({ post }: LocalBlogContentProps) => {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const MDXContent = useMDXComponent(post.body.code)
    return (
        <div className='max-w-[1440px] relative w-full mx-auto px-4 md:px-28'>
            <motion.div id='hola' className="fixed top-20 left-0 right-0  w-full h-1 z-50 bg-primary-500 origin-[0%]" style={{ scaleX }} >&nbsp;</motion.div>
            {renderSchematags('Article', {
                title: post.title,
                datePublished: post.publishedAt,
                dateModified: post.publishedAt,
                imageURL: post.imageURL ?? "",
                slug: post.slug,
                author: {
                    name: post.authorProps.name,
                    avatar: post.authorProps.avatar
                }
            })}
            <BlogContent ref={ref} data={post} content={<MDXContent />} />
            <SimilarBlogCard articles={post.otherPosts} loading={false} />
        </div>
    )
}

export default LocalBlogContent