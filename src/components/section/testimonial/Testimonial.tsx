import React from 'react'
import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography';
import AnimatedSection from '@/components/animated/AnimatedSection';

import { useTranslation } from '@/lib/i18n/client';
import ContentSection from '@/containers/layout/ContentSection';

const Testimonial = () => {
    const { t } = useTranslation('landing');
    const testimonials = t("testimonialsSection.testimonials", { returnObjects: true }) as { name: string, role: string, content: string, avatar: string }[];
    return (
        <ContentSection
            fullWidth
            additionalClassName='bg-primary-500'>
            <div className='py-28 max-w-[1440px]  w-full text-white'>
                <AnimatedSection>
                    <Typography type='h1' className=' !text-white !font-semibold text-center pb-4'>{t("testimonialsSection.title")}</Typography>
                </AnimatedSection>
                <AnimatedSection>
                    <h3 className='text-xl text-center  text-white  mb-20'>{t("testimonialsSection.description")}</h3>
                </AnimatedSection>
                <section className='flex  flex-row gap-3 xl:grid xl:grid-cols-3 overflow-x-scroll  items-stretch  w-full no-scrollbar xl:gap-x-6 gap-y-6  '>
                    {testimonials.map((testimonial, index) => (
                        <AnimatedSection delay={index * 0.1} type='scroll-opacity' key={index} className='card bg-white min-w-[324px] flex-[1]    dark:bg-gray-700 shadow border  border-neutral-200 flex-col  p-5 '>
                            <div className='card-body flex   px-0   flex-col justify-between   items-center  '>
                                <p className=' w-12/12 lg:w-10/12 text-neutral-600 text-base leading-[26px] flex-1 text-center font-light'>{testimonial.content}</p>
                                <div className='relative  w-20 h-20  mt-6'>
                                    <Image src={testimonial.avatar} alt={testimonial.name} fill objectFit='cover' className='rounded-full w-20 h-20' />
                                </div>
                                <div className='text-center'>
                                    <Typography type='p' className='text-lg text-stone-950 font-semibold mt-3'>
                                        {testimonial.name}
                                    </Typography>
                                    <p className='role text-base font-light text-stone-950 w-full'>{testimonial.role}</p>
                                </div>

                            </div>
                        </AnimatedSection>
                    ))
                    }
                </section >
            </div >
        </ContentSection>
    );
};

export default Testimonial;
