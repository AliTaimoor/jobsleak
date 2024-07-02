import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Typography',
    component: Typography,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        type: { control: 'radio', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
    },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Typographyh1: Story = {
    args: {
        children: "Typography h1",
        type: "h1",
    },
};


export const Typographyh2: Story = {
    args: {
        children: "Typography h2",
        type: "h2",
    },
};

export const Typographyh3: Story = {
    args: {
        children: "Typography h3",
        type: "h3",
    },
};

export const Typographyh4: Story = {
    args: {
        children: "Typography h4",
        type: "h4",
    },
};

export const Typographyh5: Story = {
    args: {
        children: "Typography h5",
        type: "h5",
    },
};

export const Typographyh6: Story = {
    args: {
        children: "Typography h6",
        type: "h5",
    },
};
export const Typographyp: Story = {
    args: {
        children: "Typography p",
        type: "p",
    },
};
