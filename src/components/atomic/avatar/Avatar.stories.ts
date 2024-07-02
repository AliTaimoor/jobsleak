import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Avatar',
    component: Avatar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        size: { control: "radio" },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarXs: Story = {
    args: {
        size: 'xs',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};
export const AvatarSm: Story = {
    args: {
        size: 'sm',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};

export const AvatarMd: Story = {
    args: {
        size: 'md',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};
export const AvatarLg: Story = {
    args: {
        size: 'lg',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
}; export const AvatarXl: Story = {
    args: {
        size: 'xl',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};
export const Avatar2xl: Story = {
    args: {
        size: '2xl',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};
export const Avatar3xl: Story = {
    args: {
        size: '3xl',
        name: 'John Doe',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOWnB_mn6u-Gk-rziPb3ZRObQfBHwlpN_3YLEdUQPzQ&s'
    },
};