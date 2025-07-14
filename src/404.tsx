import { PageContainer } from "@ant-design/pro-components";
import { Link, useCanGoBack } from "@tanstack/react-router";
import type { NotFoundRouteProps } from "@tanstack/router-core";
import { Button, Result, Space } from "antd";
import { Helmet } from "react-helmet-async";

export default function NotFound404(props: NotFoundRouteProps) {
  const canGoBack = useCanGoBack();
  return (
    <PageContainer pageHeaderRender={false} style={{ background: 'white' }}>
      {
        !props.data && (
          <Helmet>
            <title>页面不存在</title>
          </Helmet>
        )
      }
      <Result
        status={'404'}
        title={'404'}
        subTitle={'页面不存在'}
        extra={<Space>
          <Link to={'/'}><Button type={'primary'}>返回首页</Button></Link>
          {
            canGoBack && <Button onClick={window.history.back}>返回上一页</Button>
          }
        </Space>}
      />
    </PageContainer>
  )
}
