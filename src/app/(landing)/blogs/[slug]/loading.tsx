import BlogContent from '@/components/blog/BlogContent'
import React from 'react'

const Loading = () => {
    return (
        <div className='max-w-[1440px] w-full mx-auto px-4 md:px-28'>
            <BlogContent data={[]} isLoading={true} />
        </div>
    )
}

export default Loading