'use client'
import Features from '@/components/features/features'
import FAQ from '@/components/section/faq/FAQ'
import ContentSection from '@/containers/layout/ContentSection'
import React from 'react'

const FeaturePage = () => {
    return (
        <main className="flex   flex-col w-full ">
            <ContentSection>
                <Features />
            </ContentSection>
            <ContentSection>
                <FAQ />
            </ContentSection>
        </main>
    )
}

export default FeaturePage;