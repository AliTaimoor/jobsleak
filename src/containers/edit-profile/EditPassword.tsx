import Button from '@/components/atomic/button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import customToast from '@/components/atomic/toast/customToast'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import { updatePassword } from '@/app/actions/users'
import Typography from '@/components/atomic/typography/Typography'

interface FormValues {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
const schema = yup.object({
    currentPassword: yup.string().min(6).required(),
    newPassword: yup.string().min(6).notOneOf([yup.ref('currentPassword')], 'New password cannot be the same as old password').
        oneOf([yup.ref('confirmPassword')], 'Passwords are not the same').required(),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords are not the same').required()
})
const EditPassword = () => {
    const { data: session } = useSession()
    const { handleSubmit, control, formState: { errors }, setError } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
        }
    )
    const editPasswordMutation = useMutation({
        mutationFn: async (data: any) => {

            if (!session?.user) return

            const result = await updatePassword(session?.user.id as string, data)
            if (!result.success) {
                setError(result.error?.field as any, { message: result.error?.message })
            }
        },
        onSuccess: () => {
            customToast.success("Password updated successfully")
        },
        onError: (error) => {
            customToast.warn(error.message)
        }
    })



    const onSubmit = async (data: any) => {
        await editPasswordMutation.mutateAsync(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col   bg-white  dark:bg-card-dark dark:border-profile-modal-border-dark  p-6 rounded-2xl border border-grey-200   gap-6">
            <Typography type='p' className='text-sm text-grey-600 leading-5 ' >Edit Password</Typography>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-6'>
                    <Controller
                        control={control}
                        name="currentPassword"
                        render={({ field: { onChange, value } }) => (
                            <PasswordInputField
                                label="Current Password"
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                onChange={onChange}
                                value={value}
                                error={errors.currentPassword?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, value } }) => (
                            <PasswordInputField
                                label="New Password"
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                onChange={onChange}
                                value={value}
                                error={errors.newPassword?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <PasswordInputField
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={onChange}
                                value={value}
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />
                    <Button loading={editPasswordMutation.isPending} type='submit' variant='primary' className='w-full' label='Save Changes' />
                </div>
            </div>
        </form>
    )
}

export default EditPassword