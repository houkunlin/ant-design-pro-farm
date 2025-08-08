import bg1 from '@/assets/images/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr.webp';
import bg2 from '@/assets/images/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr.webp';
import { AvatarDropdown, AvatarName, Footer, Question } from "@/components";
import type { InitialStateType, UseInitialStateType } from "@/models";
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import type { RequestConfig } from "@/utils";
import { type ProLayoutProps, type Settings as LayoutSettings } from '@ant-design/pro-components';
import { Link } from "@tanstack/react-router";
import defaultSettings from '../config/defaultSettings';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateType> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser({ skipErrorHandler: true });
    } catch (error) {
      console.log('fetchUserInfo', error);
      // history.push(loginPath);
    }
    return undefined;
  };

  const settings = { ...defaultSettings } as Partial<LayoutSettings>;

  // 如果不是登录页面，执行
  const { location } = window;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: settings,
    };
  }
  return {
    fetchUserInfo,
    settings: settings,
  };
}

type LayoutParams = Pick<UseInitialStateType, 'initialState' | 'setInitialState'>;

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }: LayoutParams) => {
  const settings = { ...defaultSettings, ...(initialState?.settings ?? {}) };
  return {
    actionsRender: (props) => {
      // console.log('actionsRender', props);
      if (props.isMobile) return [];
      if (typeof window === 'undefined') return [];
      return [
        // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
        //   <SearchInput />
        // ) : undefined,
        <Question key="doc" />,
      ];
    },
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_props, defaultDom) => {
        return <AvatarDropdown menu>{defaultDom}</AvatarDropdown>;
      },
    },
    disableMobile: false,
    disableContentMargin: false,
    breadcrumbRender: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    contentStyle: { padding: 0 },
    footerRender: () => <Footer />,
    onPageChange: (location) => {
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location?.pathname !== loginPath) {
        // history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: bg1,
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: bg1,
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: bg2,
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    headerTitleRender: (logo, title, _) => {
      // console.log('headerTitleRender', logo, title, _);
      const defaultDom = (
        <Link
          to={'/'}
          draggable={false}
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          {logo}
          {title}
        </Link>
      );
      if (typeof window === 'undefined') return defaultDom;
      if (document.body.clientWidth < 1400) {
        return defaultDom;
      }
      if (_.isMobile) return defaultDom;
      return (
        <>
          {defaultDom}
        </>
      );
    },
    menuFooterRender: (props) => {
      if (props?.collapsed) return undefined;
      return (
        <div
          style={{
            textAlign: 'center',
            paddingBlockStart: 12,
          }}
        >
          <div>© {new Date().getFullYear()} XX 科技公司</div>
          <div>by Ant Design</div>
        </div>
      );
    },
    // links: isDev
    //   ? [
    //     <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //       <LinkOutlined />
    //       <span>OpenAPI 文档</span>
    //     </Link>,
    //   ]
    //   : [],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...settings,
  } as ProLayoutProps;
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {};
