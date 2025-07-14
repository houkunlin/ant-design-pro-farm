import NotFound404 from "@/404.tsx";
import PageLoadingWaiting from '@/components/PageLoadingWaiting';
import { genSearchConfig, queryClient } from '@/config';
import Loading from "@/loading.tsx";
import { type InitialStateType, type AccessType, useInitialState } from '@/models';
import { routeTree } from '@/routeTree.gen';
import { ProConfigProvider } from "@ant-design/pro-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashHistory, createRouter, RouterProvider, } from '@tanstack/react-router';
import { ConfigProvider } from "antd";
// @ts-ignore
import JSONBigNumber from 'json-bignumber';
import { Helmet } from 'react-helmet-async';

const history = createHashHistory();

// Create a new router instance
const router = createRouter({
  routeTree,
  history: history,
  context: {
    queryClient: undefined as unknown as QueryClient,
    initialState: undefined as unknown as InitialStateType,
    access: undefined as unknown as AccessType,
  },
  ...genSearchConfig(JSONBigNumber),
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/**
 * tanstack/react-router 应用入口
 * @constructor
 */
function TanStackApp() {
  const { initialState, access, loading } = useInitialState();
  // console.log('TanStackApp return', initialState, access, loading);
  if (loading) {
    // 页面初始化中，数据加载中
    return <>
      <Helmet>
        <title>正在初始化 . . .</title>
      </Helmet>
      <PageLoadingWaiting />
    </>;
  }

  const container = document.getElementById('root') as HTMLElement;
  const darkProps =
    initialState?.settings?.navTheme !== undefined
      ? {
        dark: initialState?.settings?.navTheme === 'realDark',
      }
      : {};
  const colorPrimary = initialState?.settings?.colorPrimary;
  const colorPrimaryThemeProps = colorPrimary
    ? {
      token: {
        colorPrimary: colorPrimary,
      },
    }
    : {};

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          getTargetContainer={() => container || document.body}
          theme={colorPrimaryThemeProps}
        >
          <ProConfigProvider {...darkProps} hashed={true}>
            <RouterProvider
              router={router}
              context={{ queryClient, initialState, access }}
              defaultPreload={'intent'}
              defaultPendingComponent={Loading}
              defaultNotFoundComponent={NotFound404}
            />
          </ProConfigProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </>
  )
}

export default TanStackApp;
