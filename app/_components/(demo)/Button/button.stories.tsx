import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
