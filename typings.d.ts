declare module '*.css';
declare module '*.png';
declare module '*.less';
declare module 'antd' {
  import { Omit } from 'antd/es/_util/type';
  import Group from 'antd/es/button/button-group';
  import { BaseButtonProps, ButtonHTMLType } from 'antd/es/button/button';
  type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  } & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'>;
  type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  } & BaseButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;
  type ButtonProps = AnchorButtonProps | NativeButtonProps;
  interface ButtonState {
    loading?:
      | boolean
      | {
          delay?: number;
        };
    hasTwoCNChar: boolean;
  }
  export class Button extends React.Component<ButtonProps, ButtonState> {
    static Group: typeof Group;
    constructor(props: ButtonProps);
    render(): JSX.Element;
  }
  export * from 'antd/es';
}
