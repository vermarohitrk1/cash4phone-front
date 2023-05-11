import React, { useState, useEffect } from 'react';
import Products from './components/Products/Products';
import Sidebar from './components/Sidebar/Sidebar';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { cityAdmin } from './api/api';
import axios from 'axios';

const { Header, Content } = Layout;

function CityAdmin(){
  let match = useRouteMatch();

  const [cityName, setCityName] = useState('MUMBAI');
  const [items, setItems] = useState([]);
  const [openModal, setopenModal] = useState(false);

  useEffect(() => {
      axios.post(cityAdmin, {
          city: cityName
      })
        .then((res) => {
            res.data.forEach(element => {
                element['key'] = element.id;
                element.createTime = element.createTime.slice(0,10);
            });
            setItems(res.data);
            // console.log(res.data);
        })
    }, [cityName])

  return (
    <Layout>

      <Sidebar cityName={cityName} setCityName={(value) => setCityName(value)} />

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ margin: '24px 16px 0', padding: 0, textAlign: 'center'}} >
            <h1 style={{ color: 'red', fontSize: '40px' }}>City Admin</h1>
        </Header>
        <Header className="site-layout-background" style={{ margin: '24px 16px 0', padding: 0, textAlign: 'center'}} >
            <h1 style={{ color: 'blue', fontSize: '35px' }}>{cityName} selected</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              <Route path={match.path}>
                <Products cityName={cityName} items={items} setItems={setItems} />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
      
    </Layout>
  )
}
export default CityAdmin;
