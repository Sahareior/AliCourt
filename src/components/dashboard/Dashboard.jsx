import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Popover, theme } from 'antd';
import { FaUser, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { MdSubscriptions, MdPrivacyTip, MdSupportAgent } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiShieldCheckLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link, Outlet, useNavigate } from 'react-router';
import { clear, clearChat } from '../../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import RecentChat from './components/chatSection/RecentChat';
import EditPlans from './components/chatSection/EditPlans';
import { useLogoutMutation } from '../../redux/Slices/apiSlice';

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()
  
const handleLogout = async () => {
  try {
    await logout(); 
    localStorage.removeItem('accessToken');
    window.location.href = '/'; 
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };

    useEffect(() => {
    navigate('/new-chat');
  }, [navigate]);

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
        <Button onClick={()=> dispatch(clear())} style={{
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
<RecentChat />
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
<EditPlans />
</div>

</div>

</div>

    <Link to='/new-chat'>
        <Button style={{
        background: 'linear-gradient(91.53deg, #051DA9 2.34%, #591DA9 96.97%)'

    }} className='w-[187px] h-[28px] mt-5 text-white' >Upgrade to pro</Button>
    </Link>

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-between items-center'>
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

     <Popover
      content={
      <div className="flex flex-col gap-4 text-[16px]">
  <Link to='/profile' className="flex items-center gap-2">
    <FaUser /> Profile
  </Link >
  <h3 className="flex items-center gap-2">
    <MdSubscriptions /> Manage Subscription
  </h3>
  <h3 className="flex items-center gap-2">
    <FaQuestionCircle /> FAQ
  </h3>
  <h3 className="flex items-center gap-2">
    <MdSupportAgent /> Help & Support
  </h3>
  <h3 className="flex items-center gap-2">
    <IoDocumentTextOutline /> Terms & Conditions
  </h3>
  <h3 className="flex items-center gap-2">
    <MdPrivacyTip /> Privacy
  </h3>
  <h3 onClick={()=> handleLogout()} className="flex items-center gap-2 cursor-pointer text-red-500 font-semibold">
    <FaSignOutAlt /> Logout
  </h3>
</div>
      }
  
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
            <div className='pr-7 flex items-center gap-5'>
            <img className='h-[40px] w-[40px] cursor-pointer rounded-full object-cover' src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <FaChevronDown size={20} />
          </div>
    </Popover>
        </Header>
        <Content
        className='max-h-[85vh]'
          style={{
            margin: '',
    
            
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