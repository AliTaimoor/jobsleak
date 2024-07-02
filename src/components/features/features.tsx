import React from 'react'
import FeatureItem from './feature-item'
import { useTranslation } from '@/lib/i18n/client'
import ContentSection from '@/containers/layout/ContentSection'

const Features = () => {
    const { t } = useTranslation('landing')
    const features = (t("features.features", { returnObjects: true }) as { title: string, description: string, image: string, direction?: "ltr" | "rtl" }[])
        .map((feature, index) => ({ ...feature, direction: index % 2 === 0 ? "ltr" : "rtl" }))
    return (
        <ContentSection>

            <section id='features' className='py-32  flex flex-col gap-32 lg:gap-64 w-full h-full md:px-0 text-black dark:text-white'>
                {features.map((feature, index) => (
                    <FeatureItem
                        key={index}
                        title={t(feature.title)}
                        description={t(feature.description)}
                        image={feature.image}
                        direction={feature.direction ?? "ltr"}
                    />
                ))}
            </section>
        </ContentSection>
    )
}

export default Features