import type { Meta, StoryObj } from '@storybook/react';
import ImageUploader from './ImageUploader';

const meta = {
    title: "Atomic/ImageUploader",
    component: ImageUploader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleImageUploader: Story = {
    args: {
        onImageUpload: (file: string) => {
            alert(`File uploaded: ${file}`);
        },
    }
};