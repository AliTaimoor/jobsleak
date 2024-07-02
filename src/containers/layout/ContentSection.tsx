import { cn } from '@/utils/cn';
import React from 'react'


interface ContentSectionProps {
    children: React.ReactNode;
    additionalClassName?: string;
    fullWidth?: boolean;
}

const ContentSection = ({ children, additionalClassName, fullWidth }: ContentSectionProps) => {

    if (fullWidth) {
        return (
            <div className={cn('w-full min-w-full', additionalClassName)}>
                <div className={cn('max-w-[1440px] w-full mx-auto px-4 md:px-28')}>
                    {children}
                </div>
            </div>
        )
    }
    return (
        <div className={cn('max-w-[1440px] w-full mx-auto px-4 md:px-28', additionalClassName)}>
            {children}
        </div>
    )
}

export default ContentSection