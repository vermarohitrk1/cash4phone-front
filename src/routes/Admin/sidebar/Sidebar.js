import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'

import { logoutapp } from '../api/api';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  UploadOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
  StockOutlined,
  DollarOutlined,
  LogoutOutlined,
  SnippetsOutlined
} from '@ant-design/icons';

import {
  Link,
  useLocation
} from "react-router-dom";

const { Sider } = Layout;
export default function Sidebar() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const location = useLocation();
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

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenu = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const menus = ['dashboard', 'sales', 'purchase', 'stock', 'soldstock', 'websiteStock', 'orders', 'leads', 'customers', 'payouts','vendorQuotes'];
    const position = menus.indexOf(activeMenu);
    setCurrentPosition(position > 0 ? position : 0);
    console.log(position, currentPosition)
  }, []);

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
              <img className="logo-img"  src={"../../../c4p-logo.jpeg"} alt="logo" />
              Inventory Admin 
              <hr></hr>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={{ currentPosition }}>
              <Menu.Item key="0" icon={<AppstoreOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="1" icon={<AreaChartOutlined />}>
                <Link to="/admin/sales">Sales</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                <Link to="/admin/purchase">Purchase</Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<DollarOutlined />}>
                <Link to="/admin/payouts">Payouts</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/admin/stock">Stock</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<StockOutlined />}>
                <Link to="/admin/soldstock">Sold Stock</Link>
              </Menu.Item>
              <hr />
              <Menu.Item key="8" icon={<UsergroupAddOutlined />}>
                <Link to="/admin/customers">Customers</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<SnippetsOutlined />}>
                <Link to="/admin/vendorQuotes">Vendor Quotes</Link>
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
              <Menu.Item key="11" icon={<LogoutOutlined />}>
              <Link to="/admin" onClick={logout}>Logout</Link>
              </Menu.Item>
            </Menu>

        </Sider>
    )
}
