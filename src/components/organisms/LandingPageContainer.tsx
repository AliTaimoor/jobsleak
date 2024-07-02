'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Cta from '@/components/section/cta/cta'
import Features from '@/components/features/features'
import Pricing from '@/components/section/pricing/pricing'
const LandingPageContainer = () => {
    return (
        <>
            <Hero />
            <Cta />
            <Features />
            <Pricing showDescription={true} />
            <FAQ />
        </>
    )
}

export default LandingPageContainer