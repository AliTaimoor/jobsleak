'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import Typography from '@/components/atomic/typography/Typography'
import FormContainer from '@/components/form/FormContainer'
import { useTranslation } from '@/lib/i18n/client'


interface FormValues {
    password: string
}
export default function ResetPasswordPage() {
    const { t } = useTranslation('auth')
    const [loading, setIsLoading] = React.useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const schema = yup.object({
        password: yup.string().min(6, t("error.weakPassword")).required(t("error.missingPassword")),
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
            const queryParams = new URLSearchParams(searchParams);
            const token = queryParams.get('token')
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    password: data.password,
                })
            })
            if (response.status === 200) {
                customToast.success(t("resetPasswordPage.resetPasswordSuccess"))
                return router.push('/login')
            } else {
                const data = await response.json()
                customToast.error(data.error.message)
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
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Link href={siteUrls.general.home}>
                <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
            </Link>
            <div className='flex flex-col gap-8'>
                <div>

                    <Typography type='h3' className=''>{t("resetPasswordPage.title")}</Typography>
                    <Typography type="p" className='mt-2  text-grey-700'>{t("resetPasswordPage.description")}</Typography>
                </div>

                <div className='flex flex-col gap-6'>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <PasswordInputField
                                label={t("resetPasswordPage.password")}
                                type="password"
                                id="password"
                                name="password"
                                placeholder={t("resetPasswordPage.passwordPlaceholder")}
                                onChange={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />
                    <div className="flex justify-center flex-col gap-4">
                        <Button variant="primary" type="submit" className="w-full" label={t("resetPasswordPage.submit")} size='lg' loading={loading} />
                    </div>
                </div>
            </div>
        </FormContainer>

    )
}
