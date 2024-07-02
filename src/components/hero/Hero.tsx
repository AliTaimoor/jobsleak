'use client'
import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/icons/PlayIcon.svg'
import AnimatedSection from '../animated/AnimatedSection'
import { AnimatedTooltip } from '../molecules/animated-tooltip/AnimatedTooltip'
import { useTranslation } from '@/lib/i18n/client'
import ContentSection from '@/containers/layout/ContentSection'
export default function Hero() {
    const { t } = useTranslation('landing');

    return (
        <ContentSection>

            <section
                className="my-20  mt-24 lg:mt-40  items-center text-center md:text-left text-black dark:text-white" >
                <div className='grid grid-cols-1 lg:grid-cols-8 justify-center gap-x-8 gap-y-8'>

                    <div className="w-full flex flex-1 lg:col-span-4 flex-col py-3 ">
                        <AnimatedSection>

                            <Typography type='h1' className=' text-left break-all lg:!leading-[72px]  min-h-[128px]  mb-4 lg:mb-5 !font-semibold break-words '>
                                {/* <TypewriterEffect words={t("heroSection.title").split(" ").map((word) => ({ text: word }))} /> */}
                                {t("heroSection.title")}
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection>

                            <Typography type='h6' className='text-left text-neutral-600 max-w-lg dark:text-sidebar-icon-dark' >
                                {t("heroSection.description")}
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection type='scroll-opacity' delay={0.1} className='flex justify-center flex-col lg:flex-row lg:justify-start mt-8 lg:mt-14 gap-2 lg:gap-3'>
                            <Button
                                variant='primary'
                                size='lg'
                                label={t('heroSection.cta')}
                            />
                        </AnimatedSection>
                    </div>
                    <AnimatedSection type='scroll-opacity' delay={0.05} className='relative w-full  flex-1 h-full  min-h-[283px] lg:col-span-4'>

                        <Image
                            alt=''
                            fill
                            objectFit="cover"
                            src={t("heroSection.image")}
                            className="w-full h-full object-cover rounded-[32px]"
                        />
                    </AnimatedSection>
                </div>
            </section >
        </ContentSection>

    )
}
