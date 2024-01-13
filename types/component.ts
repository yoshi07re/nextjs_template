import { ComponentProps } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As<Props = any> = React.ElementType<Props>;

export type OmitCommonProps<
  Target,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "as" | OmitAdditionalProps>;

export type RightJoinProps<
  SourceProps extends object = object,
  OverrideProps extends object = object
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = object,
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type PropsWithAs<
  Component extends As,
  Props extends object
> = RightJoinProps<ComponentProps<Component>, Props> & {
  as?: As;
};

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type ComponentWithAs<
  Component extends As,
  Props extends object = object
> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propTypes?: React.WeakValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: React.ValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps?: Partial<any>;
  id?: string;
};