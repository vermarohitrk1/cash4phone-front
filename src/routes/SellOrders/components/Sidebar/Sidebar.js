import React from 'react';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'

import { logout } from '../../api/api';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar({ cityName, setCityName }) {
  const SOlogout = () => {
		axios
			.get(logout)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
		window.location.reload();
	};
    return (
        <Sider

            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="logo">
              <img className="logo-img"  src={"https://cashforphone-static-resources.s3.ap-south-1.amazonaws.com/cfp-logo.png"} alt="logo" />
              Sell Orders 
              <hr></hr>
            </div>

            <Menu theme="dark" mode="inline" defaultselectedkeys={['1']}>
              {/* <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <Link to="/cityadmin">Products</Link>
              </Menu.Item> */}
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                <Link to="/sellorders">Orders</Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<HomeOutlined />} title={cityName} defaultSelectedKeys={['5']}>
                {/* <Menu.Item key="3" onClick={() => setCityName('DELHI NCR')}>DELHI NCR</Menu.Item> */}
                <Menu.Item key="4" onClick={() => setCityName('MUMBAI')}>MUMBAI</Menu.Item>
                <Menu.Item key="5" onClick={() => setCityName('CHENNAI')}>CHENNAI</Menu.Item>
                <Menu.Item key="6" onClick={() => setCityName('BANGALORE')}>BANGALORE</Menu.Item>
                <Menu.Item key="7" onClick={() => setCityName('HYDERABAD')}>HYDERABAD</Menu.Item>
                <Menu.Item key="8" onClick={() => setCityName('THANE')}>THANE</Menu.Item>
                <Menu.Item key="9" onClick={() => setCityName('JAIPUR')}>JAIPUR</Menu.Item>
                <Menu.Item key="10" onClick={() => setCityName('PUNE')}>PUNE</Menu.Item>
                <Menu.Item key="11" onClick={() => setCityName('AGRA')}>AGRA</Menu.Item>
                <Menu.Item key="12" onClick={() => setCityName('KOLKATA')}>KOLKATA</Menu.Item>
              </SubMenu>
              <hr />
              <Menu.Item key="13" icon={<UserOutlined />}>
              <Link onClick={SOlogout}>Logout</Link>
              </Menu.Item>
            </Menu>

        </Sider>
    )
}
