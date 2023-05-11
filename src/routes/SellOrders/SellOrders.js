import React, { useState, useEffect } from 'react';
import Orders from './components/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import {sellorders} from "./api/api";
import axios from 'axios';
import { ListItemAvatar } from '@mui/material';

const { Header, Content } = Layout;

function SellOrders(){

  const [cityName, setCityName] = useState('CHENNAI');
  const [items, setItems] = useState([]);
  const [openModal, setopenModal] = useState(false);

  // useEffect(() => {
  //   console.log("first one hit");
  //   axios.get(sellorders)
  //     .then((res) => {
  //       res.data.forEach(element => {
  //         element['key'] = element.id;
  //         element['timeSlot'] = element.fromTime + ' to ' + element.toTime;
  //         // element.createTime = element.createTime.slice(0,10); 
  //       });
  //       setItems(res.data);
  //       // console.log(res.data);
  //     })
  // },[]);

  useEffect(() => {
    console.log("second one hit");
    axios.post(sellorders, {
      city: cityName
    })
    .then((res) => {
        res.data.forEach(element => {
          element['key'] = element.id;
          element['timeSlot'] = element.fromTime + ' to ' + element.toTime;
          // element.createTime = element.createTime.slice(0,10); 
        });
        setItems(res.data);
    })
  }, [cityName])

  return (
    <Layout>

      <Sidebar cityName={cityName} setCityName={(value) => setCityName(value)} />

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ margin: '24px 16px 0', padding: 0, textAlign: 'center'}} >
            <h1 style={{ color: 'red', fontSize: '40px' }}>Sell-Orders</h1>
        </Header>
        <Header className="site-layout-background" style={{ margin: '24px 16px 0', padding: 0, textAlign: 'center'}} >
            <h1 style={{ color: 'orange', fontSize: '40px' }}>{cityName} selected</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Orders cityName={cityName} items={items} />
          </div>
        </Content>
      </Layout>
      
    </Layout>
  )
}
export default SellOrders;
