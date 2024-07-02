
import localFont from 'next/font/local'

import ComingSoonClient from "@/components/client/ComingSoonClient";
import getSeoMetadata from "@/lib/seo/metadata";
import { Metadata } from "next";
import React from 'react'
import platformConfig from '@/config/app-config';

export async function generateMetadata(): Promise<Metadata> {
    return getSeoMetadata({
        openGraph: {
            images: [`${platformConfig.variables.NEXT_URL}/images/og-coming-soon.png`],
        },
        twitter: {
            images: [`${platformConfig.variables.NEXT_URL}/images/og-coming-soon.png`],
        }
    });
}
const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });
const ComingSoon = () => {
    return <ComingSoonClient uniSans={uniSans} monaSans={monaSans} />;
}

export default ComingSoon
