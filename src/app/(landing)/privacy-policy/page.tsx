'use client'

import Markdown from 'react-markdown'
import React from 'react';
import BackIcon from '@/icons/BackIcon';
import { useRouter } from 'next/navigation';


// Privacy Policy chatgpt prompt
// Privacy Policy
// Write a privacy policy for a {your_business_here}. The privacy policy should include the following sections:
// 1. Information We Collect
// a. Personal Information
// b. Non-Personal Information
// 2. How We Use Your Information
// 3. How We Share Your Information
// 4. Your Choices and Controls
// 5. Security
// 6. Cookies and Tracking Technologies
// 7. International Data Transfers
// 9. Changes to This Privacy Policy
// 10. Contact Us



const markdown = `
# CodePilot Privacy Policy

## Effective Date: 24th May 2021

Welcome to CodePilot ("we," "us," "our"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services (collectively, "Services").

## 1. Information We Collect

### a. Personal Information

You may be asked to provide personal information when using our Services, including but not limited to your name, email address, mailing address, phone number, and payment information.

### b. Non-Personal Information

We collect non-personal information about your visit, including the browser type, operating system, Internet Protocol (IP) address, access times, and the pages you visited.

## 2. How We Use Your Information

We use the information we collect to:

- Provide, operate, and maintain our Services
- Improve, personalize, and expand our Services
- Understand and analyze how you use our Services
- Develop new products, services, features, and functionality
- Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
- Send you emails
- Find and prevent fraud

## 3. How We Share Your Information

We may share the information we have collected in several ways, including the following:

- With service providers who perform services for us,
- In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company,
- Between and among us and our current and future parents, affiliates, subsidiaries, and other companies under common control and ownership, and
- With your consent or at your direction.

## 4. Your Choices and Controls

We provide you with the ability to access, rectify, and erase your personal information. You can update your account information or deactivate your account through your account settings or by contacting us directly.

## 5. Security

We take reasonable measures to protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.

## 6. Cookies and Tracking Technologies

We use cookies and similar tracking technologies to track the activity on our Services and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

## 7. International Data Transfers

Your information, including personal information, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.

## 8. Children's Privacy

Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.

## 9. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 10. Contact Us

If you have any questions about this Privacy Policy, please contact us at [Insert Contact Information.
`

const PrivacyPolicyPage = () => {
    const router = useRouter()
    return <section
        className="flex relative min-h-screen mt-36   flex-col my-20 mx-auto px-4 md:px-28 max-w-8xl">
        <div className=' text-black dark:text-white absolute left-16 w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-grey-200 dark:hover:bg-category-card-autor' onClick={() => { router.back() }}>
            <BackIcon />
        </div>
        <div className='prose'>
            <Markdown remarkPlugins={[]}>
                {markdown}</Markdown>
        </div>
    </section >
};

export default PrivacyPolicyPage;