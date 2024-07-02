import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        type: { control: 'text' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        variant: 'primary',
        label: 'Button',
        children: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Button',
        children: 'Button',
    },
};
export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        label: 'Button',
        children: 'Tertiary Button',
    },
};
export const Alert: Story = {
    args: {
        variant: "alert",
        label: 'Button',
        children: 'Alert Button',
    },
};

export const SuccessButton: Story = {
    args: {
        variant: "success",
        label: 'Button',
        children: 'Success button',
    },
};
export const ClearButton: Story = {
    args: {
        variant: "clear",
        label: 'Button',
        children: 'Clear Button',
    },
};


export const SmallButton: Story = {
    args: {
        size: 'sm',
        variant: 'primary',
        children: 'Small Button',
    },
};

export const MediumButton: Story = {
    args: {
        size: 'md',
        variant: 'primary',
        children: 'Medium Button',
    },
};

export const LargeButton: Story = {
    args: {
        size: 'lg',
        variant: 'primary',
        children: 'Large Button',
    },
};