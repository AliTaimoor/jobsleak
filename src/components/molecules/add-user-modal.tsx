import Button from '@/components/atomic/button/Button';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import Dropdown from '../atomic/dropdown/Dropdown';


interface AddUserModalProps {
    onClose: () => void;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    role: yup.string().required(),
})

interface FormValues {
    email: string;
    role: string;
}

const AddUserModal = ({ onClose }: AddUserModalProps) => {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                email: '',
                role: ''
            }
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        // onTagChange(data as Tag)
    }

    return (
        <Modal isOpen={true} onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-10 gap-8 '>
                <p className='text-base font-medium leading-6'>Add User</p>
                <p className='text-sm font-normal leading-5'>Please enter the email and role</p>
                <div className='flex gap-6 flex-col'>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Enter User Email'
                                onChange={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='role'
                        render={({ field: { onChange, value, } }) => (
                            <Dropdown
                                id='role'
                                name='role'

                                value={value}
                                options={[{
                                    value: 'ADMIN',
                                    label: 'Admin',
                                },
                                {
                                    value: 'USER',
                                    label: 'User',
                                }]}
                                onChange={onChange}
                                className='!w-full'
                            />
                        )} />
                    <Button type='submit' label={"Send Invitation"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default AddUserModal