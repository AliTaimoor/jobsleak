import BlogCard from '@/components/blog/BlogCard'
import PageHeader from '@/components/blog/PageHeader'
import React from 'react'

const categories = [0, 1, 2]
const Loading = () => {
    return (
        <div className=' w-full px-4 md:px-28'>
            <PageHeader />
            {categories.map((category, index) => {
                return <BlogCard key={index.toString()} category={{ name: "sadf", slug: "123", articles: [{ slug: "sadf", short_description: "sdf", author: { avatar: "asdfasdf", name: "Asdfsad" }, title: "sadf", imageURL: "asdf", publishedAt: "sdf", description: "s" }] }} loading={true} />
            })}
        </div>
    )

}

export default Loading