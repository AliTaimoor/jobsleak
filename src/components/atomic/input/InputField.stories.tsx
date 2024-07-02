import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import AccountIcon from '@/icons/AccountIcon';
import React from 'react'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/InputField',
    component: InputField,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        type: { control: 'radio', options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'month', 'week'] },
    },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputWithLabel: Story = {
    args: {
        label: 'InputWithLabel',
        name: 'input',
        id: 'input',
        type: 'text',
    },
};

export const InputWithLeadingIcon: Story = {
    args: {
        label: 'InputWithLeadingIcon',
        name: 'input',
        id: 'input',
        type: 'text',
        leadingIcon: <AccountIcon />,
    },
};


export const InputwithError: Story = {
    args: {
        label: 'InputWithError',
        name: 'input',
        id: 'input',
        type: 'text',
        error: 'This is an error message',
    },
};

