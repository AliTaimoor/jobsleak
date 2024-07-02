import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Badge',
    component: Badge,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        size: { control: "radio", options: ['xs', 'sm', 'md'] },
        type: { control: "radio", options: ['outline', 'filled', 'clear'] },
        color: { control: "radio", options: ['primary', 'grey', 'red', 'green', 'orange', 'white'] },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleBadge: Story = {
    args: {
        size: 'md',
        type: 'filled',
        color: 'primary',
        children: 'Badge',
    },
};