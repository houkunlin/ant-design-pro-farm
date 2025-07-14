import type { AppListProps } from "@ant-design/pro-components";
import { SimpleContent } from "@ant-design/pro-layout/es/components/AppsLogoComponents/SimpleContent";
import { DefaultContent } from "@ant-design/pro-layout/es/components/AppsLogoComponents/DefaultContent";
import { useAppListStyles } from "./styles.ts";

/**
 * 提取 AppsLogoComponents 的内容
 * @param props props
 * @constructor constructor
 */
function AppList(props: { appList: AppListProps }) {
  const { appList } = props;

  const baseClassName = `ant-pro-layout-apps`;
  const { wrapSSR, hashId } = useAppListStyles(baseClassName);
  const isSimple = appList?.some((app) => {
    return !app?.desc;
  });

  if (isSimple) {
    return wrapSSR(
      <SimpleContent
        hashId={hashId}
        appList={appList}
        baseClassName={`${baseClassName}-simple`}
      />
    );
  }
  return wrapSSR(
    <DefaultContent
      hashId={hashId}
      appList={appList}
      baseClassName={`${baseClassName}-default`}
    />
  );
}

export default AppList;
