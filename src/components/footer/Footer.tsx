'use client'
import siteUrls from '@/config/site-config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Typography from '../atomic/typography/Typography'
import { useTranslation } from '@/lib/i18n/client'
import AnimatedSection from '../animated/AnimatedSection'
export default function Footer(): JSX.Element {
    const { t } = useTranslation('landing');

    const links = t("footer.links", { returnObjects: true }) as { title: string, links: { title: string, url: string }[] }[]
    return (
        <footer className="footer max-w-[1440px]  md:h-[50vh] grid grid-cols-9 grid-flow-row-dense  lg:grid-cols-9 px-4 md:px-28 text-base-content w-full  pt-24 pb-2">
            {/* <div className='container  mx-auto h-full w-full '> */}
            <AnimatedSection className='flex flex-col col-span-9 lg:col-span-3  justify-start items-start'>
                <Link href={siteUrls.general.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                    <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
                </Link>
                <Typography type='p' className=' !font-light dark:text-sidebar-icon-dark'>
                    {t("footer.description")}
                </Typography>
            </AnimatedSection>
            <div className='grid col-span-9 lg:col-start-6 grid-cols-2 lg:grid-cols-3 w-full lg:col-span-6 gap-y-16'>
                {links.map((link, index) => (
                    <AnimatedSection key={index} delay={(index + 1) * 0.1} className='flex flex-col gap-4 dark:text-white'>
                        <header className="ext-base font-medium dark:!text-white">{link.title}</header>
                        {link.links.map((item, idx) => (
                            <Link href={item.url} key={idx} className="link link-hover dark:text-sidebar-icon-dark">{item.title}</Link>
                        ))}
                    </AnimatedSection>
                ))}
            </div>

            <AnimatedSection delay={0.5} className='col-span-12 lg:col-span-10  flex justify-start pb-4 border-t-grey-100 border-t pt-4 border-[#F0F0F0] w-full dark:border-profile-modal-border-dark '>
                <p className='dark:text-sidebar-icon-dark'>{t("footer.footnote").replaceAll("%Date%", new Date().getFullYear().toString())}</p>
            </AnimatedSection>

        </footer >
    )
}
