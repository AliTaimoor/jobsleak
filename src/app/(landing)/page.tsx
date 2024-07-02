import React from 'react'

import getSeoMetadata from '@/lib/seo/metadata'
import { Metadata } from 'next'
import LandingPageContainer from '@/components/organisms/LandingPageContainer';
import { createTranslation, getLocale } from '@/lib/i18n/server';
import platformConfig from '@/config/app-config';
export async function generateMetadata(props: any): Promise<Metadata> {

  const { t } = await createTranslation('landing', props.searchParams.locale);
  const siteMetadata = {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      locale: props.searchParams.locale ?? getLocale(),
      siteName: 'Codepilot',
      url: 'www.Codepilot.dev',
      images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],

    },
    twitter: {
      description: t('metadata.description'),
      title: t('metadata.title'),
      locale: props.searchParams.locale ?? getLocale(),
      images: [`${platformConfig.variables.NEXT_URL}/images/og-demo-landing.png`],
    },
  }
  return getSeoMetadata(siteMetadata);
}

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col w-full ">
      <LandingPageContainer />
    </main>
  )
}
