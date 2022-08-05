import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
//import { useIntl } from 'umi';
import {PINK_T} from "@/constants";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const defaultMessage = '02出品';

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '02',
          href: PINK_T,
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'blog',
          href: PINK_T,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: "https://github.com/lulyqqqq",
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
