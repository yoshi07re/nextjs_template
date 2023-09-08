import { tv } from 'tailwind-variants';

import { forwardRef } from '@/lib/forwardRef';
import { ComponentWithAs } from '@/types/component';

export type ButtonProps = {
  variant?: ButtonVariant;
};

const button = tv({
  base: 'inline-block rounded-md p-4',
  variants: {
    variant: {
      primary: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
      secondary:
        'bg-white text-gray-900 outline outline-1 outline-gray-900 hover:bg-gray-100 active:bg-gray-200',
    },
  },
});

export type ButtonVariant = keyof typeof button.variants.variant;

export const Button: ComponentWithAs<'button', ButtonProps> = forwardRef(
  (
    { as: Component = 'button', variant = 'primary', className, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={button({ variant, className })}
      />
    );
  },
);
