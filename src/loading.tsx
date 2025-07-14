import { PageContainer, PageLoading } from "@ant-design/pro-components";

export default function Loading() {
  return (
    <PageContainer pageHeaderRender={false}>
      <PageLoading size={'large'} tip={'页面正在加载中，请稍候 . . .'}>
        <span />
      </PageLoading>
    </PageContainer>
  )
}
