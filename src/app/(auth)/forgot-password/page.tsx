'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import siteUrls from '@/config/site-config'
import Typography from '@/components/atomic/typography/Typography'
import FormContainer from '@/components/form/FormContainer'
import { useTranslation } from '@/lib/i18n/client'

interface FormValues {
    email: string
}
export default function ForgotPasswordPage() {
    const { t } = useTranslation('auth')
    const [loading, setIsLoading] = React.useState(false)
    const schema = yup.object({
        email: yup.string().email(t("error.invalidEmail")).required(t("error.missingEmail")),
    })

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: any) => {
        // Handle sign up logic here
        setIsLoading(true)
        try {
            // send API call to send email with token
            const response = await fetch('/api/auth/send-password-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                })
            })
            if (response.status === 200) {
                customToast.success(t("forgotPasswordPage.resetPasswordLinkSent"))
            } else {
                const data = await response.json()
                customToast.error(data.message)
            }
            // redirect to reset password page
            // show toast message

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} >
            <Link href={siteUrls.general.home}>
                <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
            </Link>
            <div className='flex flex-col gap-8'>
                <div>

                    <Typography type='h3' className=''>{t("forgotPasswordPage.title")}</Typography>
                    {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                    <Typography type="p" className='mt-2  text-grey-700'>{t("forgotPasswordPage.description")}</Typography>
                </div>

                <div className='flex flex-col gap-6'>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label={t("forgotPasswordPage.email")}
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t("forgotPasswordPage.emailPlaceholder")}
                                trailingIcon={<span className='text-grey-400'><EnvelopeIcon /> </span>}
                                onChange={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <div className="flex justify-center flex-col gap-4">
                        <Button variant="primary" type="submit" className="w-full" label={t("forgotPasswordPage.submit")} size='lg' loading={loading} />
                    </div>
                </div>
            </div>
        </FormContainer>
    )
}
