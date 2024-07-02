import type { Meta, StoryObj } from '@storybook/react';
import DropDown from './Dropdown';

const meta = {
    title: "Atomic/DropDown",
    component: DropDown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDropDown: Story = {
    args: {
        id: 'dropdown',
        name: 'dropdown',
        label: 'ExampleDropDown',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
            { value: '4', label: 'Option 4' }
        ],
        error: undefined,
        value: '1'
    }
};