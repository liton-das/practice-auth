import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { GoGraph } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import {
  AppstoreOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
const items = [
  {
    key: 'sub1',
    label: <p className='text-base'>Products</p>,
    icon: <AppstoreOutlined />,
    children: [
      { 
        key: '1', 
        label: <NavLink to={'/all-products'} className={'text-[14px] '}>All Products</NavLink> 
      },
      { 
        key: '2', 
        label: <NavLink to={'/all-category'} className={'text-[14px] '}>All Category</NavLink>
      },
      { 
        key: '3', 
        label: <NavLink to={'/'} className={'text-[14px] '}>Add Product</NavLink>
      },
      { 
        key: '4', 
        label: <NavLink to={'/add-category'} className={'text-[14px] '}>Add Category</NavLink>
      },
    ],
  }
];
const Navbar = () => {
  const [mode, setMode] = useState('inline');
  const [theme, setTheme] = useState('light');

  const navigate = useNavigate()
  const user = Cookies.get('token')
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])


  const changeMode = value => {
    setMode(value ? 'vertical' : 'inline');
  };
  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light');
  };
  return (
    <>
      <nav className="w-[252px] h-screen shadow-2xl bg-white">
        <NavLink to={"/"} className={"pt-12 pl-5 pr-[107px] flex items-center gap-4 text-[20px]"}><GoGraph />DashBoard</NavLink>
        <p className="mt-[51px] border-b border-slate-200 pb-2  pl-10 text-[13px] font-inter">Admin Panel</p>
        {/* <Switch onChange={changeMode} /> Change Mode */}
      <Divider type="vertical" />
      <Menu defaultSelectedKeys={['1']} mode={mode} theme={theme} items={items} />
      <NavLink to={"/"} className={"pl-6  flex items-center gap-2 text-[16px] text-sky-600 mb-2 font-inter "}>Orders</NavLink>
      <NavLink to={"/"} className={"pl-6  flex items-center gap-2 text-[16px] text-sky-600 font-inter "}>Client List</NavLink>
      </nav>
    </>
  );
}

export default Navbar
