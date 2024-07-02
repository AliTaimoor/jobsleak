'use client'
import platformConfig, { Plans } from '@/config/app-config'
import PricingProduct from './pricing-product'
import React from 'react'
import Typography from '@/components/atomic/typography/Typography';
import { useTranslation } from '@/lib/i18n/client';
import AnimatedSection from '@/components/animated/AnimatedSection';
import ContentSection from '@/containers/layout/ContentSection';



const features = platformConfig.pricing.features;
export default function Pricing({ showDescription = false }: { showDescription?: boolean }) {
    const { t } = useTranslation('landing')
    const [isMonthly, setIsMonthly] = React.useState(true)
    return (
        <ContentSection>
            <div className='py-28 w-full  ' id='pricing'>
                {showDescription && (
                    <AnimatedSection className=' flex flex-col justify-center items-center mb-20 gap-5 text-black dark:text-white'>
                        <Typography type='h1' className='!lg:text-[46px] !lg:leading-[64px] text-stone-950 font-semibold text-center mb-2 dark:text-white'>{t("pricing.title")}</Typography>
                        <h3 className=' text-lg lg:text-xl  max-w-[700px] font-normal  leading-[30px] text-center text-neutral-600 dark:text-sidebar-icon-dark'>{t("pricing.description")}</h3>
                    </AnimatedSection>
                )}
                
                <AnimatedSection className='grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full'>
                    <PricingProduct
                        name={t("pricing.personal.name")}
                        description={t("pricing.personal.description")}
                        price={platformConfig.pricing.plans.basic.price}
                        plan={Plans.BASIC}
                        features={features}
                        planId={platformConfig.pricing.plans.basic.planId}
                        isMonthly={isMonthly}
                    />
                    <PricingProduct
                        name={t("pricing.pro.name")}
                        description={t("pricing.pro.description")}
                        price={platformConfig.pricing.plans.pro.price}
                        plan={Plans.PRO}
                        features={features}
                        recommended={true}
                        planId={platformConfig.pricing.plans.pro.planId}
                        isMonthly={isMonthly}
                    />
                    <PricingProduct
                        name={t("pricing.enterprise.name")}
                        description={t("pricing.enterprise.description")}
                        price={platformConfig.pricing.plans.proPlus.price}
                        plan={Plans.PRO_PLUS}
                        features={features}
                        planId={platformConfig.pricing.plans.proPlus.planId}
                        isMonthly={isMonthly}
                    />
                </AnimatedSection>
            </div>
        </ContentSection>

    )
}
