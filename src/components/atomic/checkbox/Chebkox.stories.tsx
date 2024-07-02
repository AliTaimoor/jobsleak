import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
const meta = {
    title: 'Atomic/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        required: { control: 'boolean' },
        error: { control: 'text' }
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleCheckbox: Story = {
    args: {
        label: 'ExampleCheckbox',
        id: 'checkbox',
        name: 'checkbox',
        required: true,
        checked: false,
        error: undefined
    }
};

