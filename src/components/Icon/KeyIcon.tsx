import * as Icon from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/es/components/AntdIcon";
import { isNil } from "lodash";
import * as React from "react";
import { forwardRef, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from "react";
import type { IconKeyType } from "./types.ts";

export function getIconKeys() {
  return Object.keys(Icon);
}

export type IconProps = Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>;

export function getIcon(icon?: IconKeyType | string): ForwardRefExoticComponent<PropsWithoutRef<IconProps> & RefAttributes<any>> | undefined {
  if (isNil(icon)) {
    return undefined;
  }
  // @ts-ignore
  const CustomIcon1 = Icon[icon];
  if (!isNil(CustomIcon1)) {
    return CustomIcon1;
  }
  // @ts-ignore
  const CustomIcon2 = Icon[icon + 'Outlined'];
  if (!isNil(CustomIcon2)) {
    return CustomIcon2;
  }

  const icon1 = icon + 'outlined';
  const icon2 = icon.replaceAll('-', '') + 'outlined';

  const iconKeys = Object.keys(Icon);
  for (const key of iconKeys) {
    const lowerCase = key.toLowerCase();
    if (lowerCase === icon1 || lowerCase === icon2 || lowerCase === icon) {
      // @ts-ignore
      return Icon[key];
    }
  }
  return undefined;
}

export type KeyIconProps = { icon: IconKeyType | string; } & IconProps;

const KeyIcon: ForwardRefExoticComponent<PropsWithoutRef<KeyIconProps> & RefAttributes<any>> = forwardRef<any, KeyIconProps>((props, ref) => {
  const { icon, ...rest } = props;
  if (isNil(icon)) {
    return undefined;
  }
  // @ts-ignore
  const CustomIcon = getIcon(icon);
  if (isNil(CustomIcon)) {
    return undefined;
  }
  return <CustomIcon {...rest} ref={ref} />;
});

export default KeyIcon;
