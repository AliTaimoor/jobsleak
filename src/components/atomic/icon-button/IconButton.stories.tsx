import type { Meta, StoryObj } from '@storybook/react';
import AccountIcon from '@/icons/AccountIcon';
import React from 'react'
import IconButton from './IconButton';
import CrossIcon from '@/icons/CrossIcon';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/IconButton',
    component: IconButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        icon: {
            options: [<AccountIcon key={'1'} />, <CrossIcon key={'2'} />],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AccountIconButton: Story = {
    args: {
        icon: <AccountIcon />
    },
};

export const CloseIconButton: Story = {
    args: {
        icon: <CrossIcon />
    }
}