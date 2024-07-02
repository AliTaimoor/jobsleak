import AnimatedSection from '@/components/animated/AnimatedSection'
import Typography from '@/components/atomic/typography/Typography'
import ContentSection from '@/containers/layout/ContentSection'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Cta = () => {
    const { t } = useTranslation('landing');

    const reasons = t("ctaSection.reasons", { returnObjects: true }) as { metric: string, description: string }[];
    return (
        <ContentSection
            fullWidth
            additionalClassName='bg-primary-500'
        >
            <div className=" w-full my-24  flex-col justify-center items-center gap-0 lg:gap-10 inline-flex text-black ">
                <AnimatedSection className=' flex flex-col justify-center items-center gap-5 mb-6'>
                    <Typography type='h1' className='text-left lg:text-center !text-white '>{t("ctaSection.title")}</Typography>
                    <Typography type='h6' className='text-white text-left lg:text-center max-w-2xl leading-[24px] text-[16px] '>{t("ctaSection.description")}</Typography>
                </AnimatedSection>
                <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8   w-full ">
                    {reasons.map((reason, index) => (
                        <AnimatedSection key={reason.metric} delay={index * 0.1}>
                            <div className=" w-full  h-48  lg:h-56 rounded-[10px]  shadow-lg bg-white border border-neutral-200  flex-col justify-center items-center gap-4 inline-flex">
                                <Typography type='h3' className='text-stone-950  dark:!text-stone-950  !text-[46px] !lg:text-[56px] leading-[64px]  !font-semibold '>{t(reason.metric)}</Typography>
                                <Typography type='p' className=" text-center text-neutral-600 dark:text-neutral-600  text-[16px]  lg:text-[20px] leading-[30px] font-light  l">{t(reason.description)}</Typography>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div >
        </ContentSection>
    )
}

export default Cta