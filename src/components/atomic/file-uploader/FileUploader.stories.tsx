import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import FileUploader from './FileUploader';

const meta = {
    title: "Atomic/FileUploader",
    component: FileUploader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleFileUploader: Story = {
    args: {
        onFileUpload: (file: string) => {
            alert(`File uploaded: ${file}`);
        },
        uploadText: (<>Upload a file or <span className='text-primary-500'>click to browse.</span></>),
    }
};