'use client'

import Markdown from 'react-markdown'
import React from 'react';
import BackIcon from '@/icons/BackIcon';
import { useRouter } from 'next/navigation';


// Terms of Service chatgpt prompt
// Terms of Service
// Write a terms of service agreement for a software application named {business_name}. The terms of service should include the following sections:
// 1. Introduction
// 2. Changes to the Terms of Service
// 3. Service Description
// 4. Registration, Accounts, and Passwords
// 5. User Conduct
// 6. Intellectual Property Rights
// 7. Termination
// 8. Disclaimer of Warranties
// 9. Limitation of Liability
// 10. General Representation and Warranty
// 11. Indemnification
// 12. Miscellaneous


const markdown = `
# CodePilot Terms of Service

## 1. Introduction

Welcome to CodePilot. By accessing or using CodePilot's services, websites, or software provided through or in connection with the service ("Service"), you signify that you have read, understood, and agree to be bound by these Terms of Service ("Terms"), regardless of whether you are a registered user of CodePilot.

## 2. Changes to the Terms of Service

CodePilot reserves the right, at its sole discretion, to modify or replace the Terms at any time. If the alterations constitute a material change to the Terms, CodePilot will notify you by posting an announcement on the Service. What constitutes a "material change" will be determined at CodePilot's sole discretion. You shall be responsible for reviewing and becoming familiar with any such modifications. Using the Service following notification of a material change to the Terms shall constitute your acceptance of the Terms as modified.

## 3. Service Description

CodePilot provides a suite of tools and resources designed for coding professionals, including but not limited to code repository access, development tools, collaboration features, and analytics services. Services may be offered through various platforms, including but not limited to web and mobile applications.

## 4. Registration, Accounts, and Passwords

If you choose to register for the Service, you agree to provide and maintain true, accurate, current, and complete information about yourself as prompted by the Service's registration form. Registration data and certain other information about you are governed by our Privacy Policy.

## 5. User Conduct

You are solely responsible for all code, video, images, information, data, text, software, music, sound, photographs, graphics, messages, or other materials ("content") that you upload, post, publish, or display (hereinafter, "upload") or email or otherwise use via the Service. The following are examples of the kind of content and/or use that is illegal or prohibited by CodePilot.

## 6. Intellectual Property Rights

You acknowledge that CodePilot owns all rights, title, and interest in and to the Service, including all intellectual property rights. CodePilot's rights are protected by U.S. and international intellectual property laws. Accordingly, you agree that you will not copy, reproduce, alter, modify, or create derivative works from the Service.

## 7. Termination

CodePilot may terminate your access to all or any part of the Service at any time, with or without cause, with or without notice, effective immediately, which may result in the forfeiture and destruction of all information associated with your membership.

## 8. Disclaimer of Warranties

The Service is provided "as is". CodePilot and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.

## 9. Limitation of Liability

In no event will CodePilot, or its suppliers or licensors, be liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data.

## 10. General Representation and Warranty

You represent and warrant that (i) your use of the Service will be in strict accordance with the CodePilot Privacy Policy, with these Terms, and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside) and (ii) your use of the Service will not infringe or misappropriate the intellectual property rights of any third party.

## 11. Indemnification

You agree to indemnify and hold harmless CodePilot, its contractors, and its licensors, and their respective directors, officers, employees, and agents from and against any and all claims and expenses, including attorneys' fees, arising out of your use of the Service, including but not limited to your violation of this Agreement.

## 12. Miscellaneous

These Terms constitute the entire agreement between CodePilot and you concerning the subject matter hereof, and they may only be modified by a written amendment signed by an authorized executive of CodePilot`

const TermsOfServicePage = () => {
    const router = useRouter()
    return <section
        className="flex relative min-h-screen mt-36   flex-col my-20 mx-auto px-4 md:px-28 max-w-8xl">
        <div className=' text-black dark:text-white  absolute left-16 w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-grey-200 dark:hover:bg-category-card-autor' onClick={() => { router.back() }}>
            <BackIcon />
        </div>
        <div className='prose'>
            <Markdown remarkPlugins={[]}>
                {markdown}</Markdown>
        </div>
    </section >
};

export default TermsOfServicePage;