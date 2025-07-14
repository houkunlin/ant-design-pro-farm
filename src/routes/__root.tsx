import NotFound404 from "@/404.tsx";
import type { RouteContextType } from "@/config";
import Loading from "@/loading.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { App, Button, Result, Space } from "antd";

export const Route = createRootRouteWithContext<RouteContextType>()({
  component: RootLayout,
  notFoundComponent: NotFound404,
  pendingComponent: Loading,
  errorComponent: RootErrorComponent,
});

function RootLayout() {
  return <>
    <HeadContent />
    <App>
      <Outlet />
    </App>
    <Scripts />
    {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
  </>
}

function RootErrorComponent(props: { error: any; reset: Function } & any) {
  const { error, reset } = props;
  console.log('RootErrorComponent', props)
  return <Result
    status="error"
    title={error.name}
    subTitle={<>
      <span>{error.message}</span>
      <pre style={{
        textAlign: 'left',
        fontSize: '1em',
        border: '1px solid red',
        borderRadius: '.25rem',
        padding: '.3rem',
        color: 'red',
        overflow: 'auto',
      }}><code>{error.stack}</code></pre>
    </>}
    extra={<Space>
      <Link to={'/'}><Button type={'primary'}>返回首页</Button></Link>
      <Button type={'default'} onClick={reset}>重置</Button>
    </Space>}
  />
}
