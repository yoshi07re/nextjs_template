import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    as: 'a',
    href: '#',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    as: 'a',
    href: '#',
  },
};
