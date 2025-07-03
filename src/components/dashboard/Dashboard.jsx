import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}  className="bg-white">
        <div className="bg-white " />
                <div className='flex gap-3 justify-center pb-10 pt-4  items-center'>
                    <img className='w-[45.88px] h-[33.02px]' src="/images/auth/Vector.png" alt="" />
                    <h4 className='text-[#521DA4] font-bold'>GAMEPLAN</h4>
                </div>

    <Button style={{
        background: 'linear-gradient(91.53deg, #051DA9 2.34%, #591DA9 96.97%)'

    }} className='w-[187px] h-[28px] text-white'>Create Chat</Button>
        <Menu
          theme="light"
          mode="inline"
          className='mt-8'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
              
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
        className='h-[85vh]'
          style={{
            margin: '24px 16px',
            padding: 24,
            
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;