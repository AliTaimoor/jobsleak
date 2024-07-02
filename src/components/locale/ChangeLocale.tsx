'use client';
import React from 'react';
import { switchLocaleAction } from '@/app/actions/switch-locale';
import { useTranslation } from '@/lib/i18n/client';
import Dropdown from '../atomic/dropdown/Dropdown';

// We removed the `locale` prop because we can get it from the hook
export default function ChangeLocale() {
    const { i18n, } = useTranslation('common');
    // You can also use our custom hook instead of `i18n.resolvedLanguage`
    // const locale = useLocale();

    return (
        <div>
            <Dropdown
                id='locale-dropdown'
                name='locale'
                onChange={val => switchLocaleAction(val)}
                value={i18n.language}
                options={[
                    { value: 'en', label: "🇺🇸" },
                    { value: 'de', label: "🇩🇪" },

                ]} // Add the options here
                className=' min-w-fit !w-16 focus:!border-none !border-none !shadow-none '
            />
        </div>
    ); 3
}
