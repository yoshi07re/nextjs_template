import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

/** mock of link component */
type MockLinkProps = {
  href: string;
  className?: string;
};

function MockLink({
  href,
  children,
  className,
}: React.PropsWithChildren<MockLinkProps>) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

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

export const AsLink: Story = {
  args: {
    variant: 'primary',
    as: 'a',
    href: '#',
  },
};

export const AsLinkComponent: Story = {
  args: {
    variant: 'primary',
    as: MockLink,
    href: '#',
  },
};
