'use client'
import FAQ from '@/components/section/faq/FAQ'
import Pricing from '@/components/section/pricing/pricing'
import ContentSection from '@/containers/layout/ContentSection'
import React from 'react'

const PricingPage = () => {
    return (
        <main className="flex min-h-screen flex-col">
            <ContentSection>

                <Pricing showDescription={true} />

            </ContentSection>
            <ContentSection>
                <FAQ />
            </ContentSection>
        </main>
    )
}

export default PricingPage