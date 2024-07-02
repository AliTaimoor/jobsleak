import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta = {
    title: "Atomic/Divider",
    component: Divider,
    decorators: [(Story: any) => (<div style={{ display: 'flex', justifyContent: 'center', width: "w-full", height: "h-32" }}> <Story /></div>)],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        dividerStyle: { control: 'radio', options: ['light', 'heavy'] },
        dividerType: { control: 'radio', options: ['horizontal', 'vertical'] }
    }
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDivider: Story = {
    render: ({ dividerStyle, dividerType }) => <div className='bg-red-300  flex justify-center items-center w-32 h-32'><Divider dividerStyle={dividerStyle} dividerType={dividerType} /></div>
};