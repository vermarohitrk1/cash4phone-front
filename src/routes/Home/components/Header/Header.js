import React, { useState } from 'react';
import "./Header.css";
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoginModal from '../Login/Modal/LoginModal';
import axios from 'axios';
import { logout } from '../../api/api';

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};



const phoneMenu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Apple</Menu.Item>
    <Menu.Item key="2">Xiaomi</Menu.Item>
    <Menu.Item key="3">Samsung</Menu.Item>
    <Menu.Item key="4">OnePlus</Menu.Item>
    <Menu.Item key="5">Nokia</Menu.Item>
    <Menu.Item key="6">Oppo</Menu.Item>
    <Menu.Item key="7">Vivo</Menu.Item>
    <Menu.Item key="8">More</Menu.Item>
  </Menu>
);

const laptopMenu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Apple</Menu.Item>
    <Menu.Item key="3">Samsung</Menu.Item>
    <Menu.Item key="4">OnePlus</Menu.Item>
    <Menu.Item key="6">Oppo</Menu.Item>
    <Menu.Item key="8">More</Menu.Item>
  </Menu>
);



export default function Header() {

  const [openModal, setopenModal] = useState(false);

  const handleLogin = ({ key }) => {
    setopenModal(true);
    
  }

  const handleLogout = () => {
    axios.post(logout)
      .then((res) => {
        if(res.status == 200) {
          window.location.reload();
        }
      })
  }

  const handleProfile = () => {
    // console.log("Phone number is ", props.phoneNo);
  }

  const loginMenu = (
    <Menu >
      <Menu.Item key="1" onClick={handleLogin}>Login</Menu.Item>
      <a href="/user">
        <Menu.Item key="2">Profile</Menu.Item>
      </a>
      <Menu.Item key="3" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className='header'>
      {openModal && 
          <LoginModal 
              openModal={openModal}
              setopenModal={(value) => setopenModal(value)}
              title={"Welcome to Cashforphone"}
              type={"purchase"} />
      }
      <div className='header_head'>
        <div className="header__logo">
          <a href="https://buy.cashforphone.in/">
            <img className="header__logo-img"  src="https://cashforphone.in/assets/images/cfp-logo.png" alt="logo" />
          </a>
        </div>
        <div className="header__contact">
          <div className="header__contact__phone" >
            <div><PhoneIcon  /></div>
            <div>8800880101</div>
          </div>
          <div className="header__contact__social-media">
            <div>
              <a href="https://www.facebook.com/getcashforphone/" target="_blank"><FacebookIcon  /></a>
            </div>
            <div>
              <a href="https://twitter.com/Cashforphone3" target="_blank"><InstagramIcon  /></a>
            </div>
            <div>
              <a href="https://www.instagram.com/cashforphone/" target="_blank"><TwitterIcon  /></a>
            </div>
            <div>
              <a href="https://www.linkedin.com/company/cashforphone/" target="_blank"><LinkedInIcon  /></a>
            </div>
          </div>
        </div>
      </div>

      <div className='header_foot'>
        <div className="header_foot_content">
          <a href="https://buy.cashforphone.in/">Home</a>
          <Dropdown overlay={phoneMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Refurbished Phone <DownOutlined />
            </a>
          </Dropdown>

          <Dropdown overlay={laptopMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Open Box / Like New <DownOutlined />
            </a>
          </Dropdown>
          
          {/* <p>Refurbished ram</p> */}
          <p>Cable & Chargers</p>
          <p>Refer and Earn</p>
          <p>Contact</p>
        </div>
        <div className="header_foot_login">
          <Dropdown overlay={loginMenu}>
            <p>Login <DownOutlined /> </p>
          </Dropdown>
        </div>
      </div>
    </div>
  )

}
