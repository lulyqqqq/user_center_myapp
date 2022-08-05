import Footer from '@/components/Footer';
import { register} from '@/services/ant-design-pro/api';

import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormattedMessage, history, SelectLang, useIntl, useModel} from 'umi';
import styles from './index.less';
import {PINK_T, SYSTEM_LOGO} from "@/constants";
// import SYSTEM_LOGO from "https://lulyqqqq.github.io/Gallery/leimu/index/02.png"


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');


  const handleSubmit = async (values: API.RegisterParams) => {

    const {userPassword,checkPassword} = values;
    if (checkPassword!==userPassword){
      message.error('两次输入的密码不匹配');
      return;
    }

    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
      // else {
      //   throw new Error(res.description)
      // }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={
            {
              searchConfig:{
                submitText:'注册'
              }
            }
          }
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="零贰管理中心"
          subTitle={<a href={PINK_T} target="_blank" rel="noreferrer">学习平台</a>}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={'账号密码注册'}
            />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder='请输入账号'
                rules={[
                  {
                    required: true,
                    message: '账号为必填'
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder='请输入密码'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="密码为必填！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码不能小于8位"
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder='请再次输入密码'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="确认密码为必填！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码不能小于8位"
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
