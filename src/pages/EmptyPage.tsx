import { PageContainer } from "@ant-design/pro-components";
import { Card, Result } from "antd";

export default function EmptyPage() {
  return (
    <PageContainer pageHeaderRender={false}>
      <Card>
        <Result
          status={"404"}
          title={"当前页面无内容"}
          subTitle={"当前页面无内容，请点击菜单项进入相关功能页面"}
        />
      </Card>
    </PageContainer>
  );
}
