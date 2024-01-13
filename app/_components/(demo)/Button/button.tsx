import { cva, type VariantProps } from 'class-variance-authority';

import { forwardRef } from '@/lib/forwardRef';
import { cn } from '@/lib/utils';
import { ComponentWithAs } from '@/types/component';

const buttonVariants = cva('inline-block rounded-md p-4', {
  variants: {
    variant: {
      primary: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
      secondary:
        'bg-white text-gray-900 outline outline-1 outline-gray-900 hover:bg-gray-100 active:bg-gray-200',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
}

export const Button: ComponentWithAs<'button', ButtonProps> = forwardRef(
  (
    { as: Component = 'button', variant = 'primary', className, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant }), className)}
      />
    );
  },
);
