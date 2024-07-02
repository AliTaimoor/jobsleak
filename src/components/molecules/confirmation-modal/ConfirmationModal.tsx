import Modal from '@/components/atomic/modal/Modal'
import React from 'react'

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ConfirmationModal = ({ isOpen, onClose, children, icon, title, description }: ConfirmationModalProps) => {
    return (

        <Modal isOpen={isOpen} onClose={onClose}
        >
            <div className='flex flex-col gap-6 p-8 justify-start content'>
                {icon}
                <div className='flex flex-col gap-2'>
                    <p className='text-base font-medium leading-6'>{title}</p>
                    <p className='text-sm font-normal leading-5'>{description}</p>
                </div>
            </div>
            <div className='flex justify-end gap-2 py-4 px-6 bg-grey-50 dark:bg-card-dark'>
                {children}
            </div>
        </Modal>
    )
}

export default ConfirmationModal