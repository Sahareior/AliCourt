import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { BsThreeDots } from "react-icons/bs";
import { Link, Outlet, useNavigate } from 'react-router';
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
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

    <Link to='/new-chat'>
        <Button style={{
        background: 'linear-gradient(91.53deg, #051DA9 2.34%, #591DA9 96.97%)'

    }} className='w-[187px] h-[28px] text-white' >Create Chat</Button>
    </Link>
        <Menu
          theme="light"
          mode="inline"
          className='mt-5'
          defaultSelectedKeys={['/new-chat']}
           onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/calender',
              icon: <UserOutlined />,
              label: 'Calender',
              
            },
            {
              key: '/class',
              icon: <VideoCameraOutlined />,
              label: 'Create Class',
            },
          ]}
        />
{/* background: linear-gradient(90deg, #00B6FE 0%, #5C7DFB 50%, #8C3AFD 100%); */}

<div className='mt-4'>
  <div className='mt-4 flex justify-center items-center'>
  
<Button
  className="text-[18px] w-[101px] border-none h-[22px] text-sm bg-gradient-to-r from-[#00B6FE] via-[#5C7DFB] to-[#8C3AFD] bg-clip-text text-transparent"
>
  Recent Plans
</Button>

       <Button className='text-xs border-none h-[22px]'>All Plans </Button>
</div>
<div className='h-28 mt-5 overflow-y-auto'>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
</div>
{/* ................ */}
</div>
{/* Section 2.................................... */}
<div>
<div className='mt-4'>
  <div className='mt-4 flex justify-center items-center'>
  
<Button
  className="text-[18px] w-[101px] border-none h-[22px] text-sm bg-gradient-to-r from-[#00B6FE] via-[#5C7DFB] to-[#8C3AFD] bg-clip-text text-transparent"
>
  Saved Plans
</Button>

       <Button className='text-xs border-none h-[22px]'>All Plans </Button>
</div>
<div className='h-28 mt-5 overflow-y-auto'>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
  <div className='flex justify-between px-6 mt-3  items-center'>
  <h4>Last Chat</h4>
  <BsThreeDots />
</div>
</div>
{/* ................ */}
</div>
</div>
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
         <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;