import React from 'react';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'

import { logoutapp } from '../api/api';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const logout = () => {
		axios
			.get(logoutapp)
			.then((res) => {
				console.log(res.data);
		    window.location.reload();

			})
			.catch((err) => {
				console.log(err.response);
			});
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
              Inventory Admin 
              <hr></hr>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <Link to="/admin">Sales</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                <Link to="/admin/purchase">Purchase</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/admin/stock">Stock</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UploadOutlined />}>
                <Link to="/admin/soldstock">Sold Stock</Link>
              </Menu.Item>
              <hr />
              <Menu.Item key="5" icon={<UploadOutlined />}>
                <Link to="/admin/websiteStock">Buy Stock</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UploadOutlined />}>
                <Link to="/admin/orders">Orders</Link>
              </Menu.Item>
              <hr />
              <Menu.Item key="7" icon={<UploadOutlined />}>
                <Link to="/admin/leads">All Leads</Link>
              </Menu.Item>
              <hr />
              <Menu.Item key="8" icon={<UserOutlined />}>
              <Link to="/admin" onClick={logout}>Logout</Link>
              </Menu.Item>
            </Menu>

        </Sider>
    )
}