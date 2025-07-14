import { layout } from '@/app.tsx';
import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import KeyIcon from '@/components/Icon/KeyIcon';
import Loading from '@/loading.tsx';
import { useInitialState } from '@/models';
import { isNil } from 'lodash';
import type { MenuDataItem } from '@ant-design/pro-components';
import { isDeepEqualReact, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, } from '@tanstack/react-router';
import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import defaultSettings from '../../config/defaultSettings.ts';
import menus from '../../config/menu.ts';

export default function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const { initialState, setInitialState, access, loading } = useInitialState();
  const settings = useMemo(() => {
    if (initialState?.settings) {
      return { ...defaultSettings, ...initialState.settings };
    }
    return { ...defaultSettings };
  }, [initialState?.settings]);

  const runtimeConfig = useMemo(() => layout({ initialState, setInitialState }), [initialState, setInitialState]);

  const menuDataRender = (menuData: MenuDataItem[]): MenuDataItem[] => {
    // console.log('menuDataRender', menuData);
    return menuData.filter(item => {
      if (isNil(access?.check)) {
        // 没有 access.check，只显示没有设置 access 的菜单
        return isNil(item.access);
      }
      return item.access ? access.check(item.access) : true;
    })
      .map(item => {
        if (item.icon) {
          item.icon = typeof item.icon === 'string' ? <KeyIcon icon={item.icon} /> : item.icon;
        }
        if (item.children) {
          item.children = menuDataRender(item.children);
        }
        return item;
      });
  };

  return (
    <>
      <ProLayout
        route={menus}
        location={{ pathname: location.pathname }}
        siderWidth={256}
        loading={loading}
        menu={{
          locale: true,
          collapsedShowGroupTitle: true,
          type: 'sub',
        }}
        token={{
          header: {
            colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
          },
        }}
        contentStyle={{
          padding: 0,
        }}
        formatMessage={(message) => {
          return t(message.id, message.defaultMessage ?? message.id) as any;
        }}
        // onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={menuDataRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          // console.log('menuItemRender', menuItemProps, defaultDom);
          if (menuItemProps.isUrl && menuItemProps.children) {
            return defaultDom;
          }
          if (menuItemProps.isUrl) {
            return (
              // handle wildcard route path, for example /slave/* from qiankun
              <Link to={menuItemProps.path} target={menuItemProps.target || '_blank'}>
                {defaultDom}
              </Link>
            );
          }
          if (menuItemProps.path && location.pathname !== menuItemProps.path) {
            // return defaultDom;
            return (
              // handle wildcard route path, for example /slave/* from qiankun
              <Link to={menuItemProps.path} target={menuItemProps.target}>
                {defaultDom}
              </Link>
            );
          }
          return defaultDom;
        }}
        itemRender={(route, _, routes) => {
          // 处理每个面包屑的配置
          // console.log('itemRender', route, _, routes);
          const { title, path } = route;
          const label = title;
          const last = routes[routes.length - 1];
          if (last) {
            // @ts-ignore
            if (last.path === path || last.linkPath === path) {
              return <span>{label}</span>;
            }
          }
          return <Link to={path}>{label}</Link>;
        }}
        fixSiderbar
        fixedHeader
        {...runtimeConfig}
        ErrorBoundary={CustomErrorBoundary}
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ProLayout>
      {
        process.env.NODE_ENV === 'development' && (
          <SettingDrawer
            pathname={location.pathname}
            enableDarkTheme={true}
            disableUrlParams={true}
            getContainer={(e: any) => {
              if (typeof window === 'undefined') return e;
              return document.getElementById('root');
            }}
            settings={settings}
            onSettingChange={(changeSetting) => {
              const newSetting = { ...settings, ...changeSetting };
              if (!isDeepEqualReact(settings, newSetting)) {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings: newSetting,
                }));
              }
            }}
          />
        )
      }
    </>
  );
}
