import { ComponentProps, forwardRef as forwardReactRef } from 'react';

import { As, ComponentWithAs, RightJoinProps } from '@/types/component';

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RightJoinProps<ComponentProps<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}
