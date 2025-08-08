import { Footer } from "@/components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useNavigate } from "@tanstack/react-router";
import { Tabs } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles.ts";

export default function Login() {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {t('menu.login')}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={<></>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async () => {
            return new Promise(resolve => {
              setTimeout(() => {
                navigate({ to: '/' });
                resolve();
              }, 2000);
            })
          }}
        >
          <Tabs
            centered
            items={[
              {
                key: 'login',
                label: '账号密码',
              }
            ]}
          />
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
              autoComplete: 'username',
            }}
            placeholder={'用户名/手机号/电子邮箱'}
            rules={[
              {
                required: true,
                message: '请输入用户名/手机号/电子邮箱',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
              allowClear: true,
              autoComplete: 'password',
            }}
            placeholder={'登录密码'}
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
}
