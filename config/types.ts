import type { IconKeyType } from '@/components/Icon/types';
import type { FileRoutesByTo } from '@/routeTree.gen';
import type { Route } from '@ant-design/pro-layout/es/typing';
import type { FileRoutesByPath } from '@tanstack/react-router';
import type React from 'react';

/**
 * 菜单类型
 */
export type IMenu = Omit<Route, 'path' | 'icon' | 'children'> & {
  path: keyof FileRoutesByPath | keyof FileRoutesByTo | string;
  icon?: React.ReactNode | IconKeyType | string;
  children?: IMenu[];
};

/**
 * 定义单个菜单配置
 * @param menu 菜单
 */
export function defineMenu(menu: IMenu) {
  return menu;
}

/**
 * 定义多个菜单配置
 * @param menus 菜单
 */
export function defineMenus(menus: IMenu[]) {
  return menus;
}
