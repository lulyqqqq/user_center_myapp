import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-components';


const Admin: React.FC = (props) => {

  const {children} = props
  return (
    <PageHeaderWrapper content={'只有管理权限才能查看'}>
      {children}
    </PageHeaderWrapper>
  );
};
export default Admin;
