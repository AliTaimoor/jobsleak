import type { Meta } from '@storybook/react';
import React from 'react';
import ToastProvider from '@/lib/providers/toast.provider';
import Button from '../button/Button';
import customToast from './customToast';
import { ToastContainer, cssTransition } from 'react-toastify';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Toast',
    component: ToastProvider,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    decorators: [(story: any) => <div> {story()}</div>],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof ToastProvider>;

export default meta;


const ToastWrapper = () => {
    return (
        <div className='h-full relative'>
            <ToastContainer
                className={"absolute z-50"}
                position={"top-center"}
                autoClose={2000}
                hideProgressBar
                newestOnTop
                draggable={true}
                closeOnClick
                rtl={false}
                theme="colored"
                transition={cssTransition({
                    enter: 'zoomIn',
                    exit: 'zoomOut',
                    collapse: false,
                    collapseDuration: 0,
                })}
            />
            <div className='w-full min-w-[500px] flex justify-center items-center h-96  flex-col gap-3'>
                <Button variant={"success"} onClick={() => customToast.success('Success message')}>Success Toast</Button>
                <Button variant={"tertiary"} onClick={() => customToast.warn('Warning message')}>Warning Toast</Button>
                <Button variant={"alert"} onClick={() => customToast.error('Error message')}>Error Toast</Button>
            </div >

        </div >
    )
}

export const ExampleModal = {
    render: () => <ToastWrapper />
}