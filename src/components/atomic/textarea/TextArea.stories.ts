import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
const meta = {
    title: 'Atomic/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaWithLabel: Story = {
    args: {
        label: 'TextAreaWithLabel',
        name: 'textarea',
        placeholder: 'Enter your text here',
        id: 'textarea',
    },
};

export const TextAreaErrorState: Story = {
    args: {
        label: 'TextAreaErrorState',
        name: 'textarea',
        placeholder: 'Enter your text here',
        id: 'textarea',
        error: 'This is an error message',
    },
};

