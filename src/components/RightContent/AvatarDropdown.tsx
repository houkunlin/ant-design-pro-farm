import { useInitialState } from "@/models";
import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, UserOutlined, } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import { isNil } from 'es-toolkit';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useInitialState();
  const { currentUser } = initialState ?? {};
  return <span className="anticon">{currentUser?.nickname}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect') ?? (search as any).redirect;
    // Note: There may be security issues, please note
    // location.pathname 获取到 hash path 路径值
    if (pathname !== '/user/login' && !redirect) {
      if (pathname === '/') {
        // 经过测试，退出登录后，框架能够正常移除需要登录的菜单
        // window.location.reload();
        return;
      }
      navigate({
        to: '/user/login',
        replace: true,
        search: new URLSearchParams({ redirect: pathname + search, }).toString()
      });
    }
  };
  const { styles } = useStyles();

  const { initialState, setInitialState } = useInitialState();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      navigate({ to: `/current/${key}`, });
    },
    [setInitialState, navigate],
  );

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (isNil(currentUser) || isNil(currentUser?.id) || isNil(currentUser?.nickname)) {
    const { search, pathname } = window.location;

    return (
      <>
        <div style={{ display: 'flex', height: 26 }}>
          <Link to={'/user/login'} search={{ redirect: pathname + search }}>登录</Link>
        </div>
      </>
    );
  }

  const menuItems = [
    ...(menu
      ? [
        // {
        //   key: 'center',
        //   icon: <UserOutlined />,
        //   label: '个人中心',
        // },
        {
          key: 'base',
          icon: <UserOutlined />,
          label: '基本设置',
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
