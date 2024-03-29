import React from 'react';
import "./Admin.css";

import Sales from "./components/Sales/Sales";
import Purchase from "./components/Purchase/Purchase";
import Stock from "./components/Stock/Stock";
import Login from './components/Login/Login';
import SaleInvoice from './components/Sales/SaleInvoice/SaleInvoice';
import SoldStock from './components/SoldStock/SoldStock';
import WebsiteStock from './components/WebsiteStock/WebsiteStock';
import Orders from './components/Orders/Orders';
import Leads from './components/Leads/Leads';
import Dashboard from './components/Dashboard/Dashboard';
import Customers from './components/Customers/Customers'
import CustomerDetails from './components/Customers/CustomerDetials'
import Payouts from "./components/Payouts/payouts";
import Qoutes from "./components/VendorQuote/Qoutes";
import QuoteList from "./components/VendorQuote/QouteList/QouteList";
import Sidebar from "./sidebar/Sidebar";

import {
  Switch,
  Route,
  useRouteMatch,
  useLocation, 
} from "react-router-dom";



import { Layout } from 'antd';
import 'antd/dist/antd.css';
// import { Dashboard } from '@material-ui/icons';

const { Header, Content } = Layout;

function Admin(){

  let match = useRouteMatch();

  return (
    <Layout>

      <Sidebar />

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              <Route path={`${match.path}/dashboard`}>
                <Dashboard />
              </Route>
              <Route path={`${match.path}/customers`}>
                <Customers />
              </Route>
              <Route path={`${match.path}/vendorQuotes`}>
                <Qoutes />
              </Route>
              <Route path={`${match.path}/leads`}>
                <Leads />
              </Route>
              <Route path={`${match.path}/websiteStock`}>
                <WebsiteStock />
              </Route>
              <Route path={`${match.path}/orders`}>
                <Orders />
              </Route>
              <Route path={`${match.path}/purchase`}>
                <Purchase />
              </Route>
              <Route path={`${match.path}/payouts`}>
                <Payouts />
              </Route>
              <Route path={`${match.path}/stock`}>
                <Stock />
              </Route>
              <Route path={`${match.path}/soldstock`}>
                <SoldStock />
              </Route>
              <Route path={`${match.path}/login`}>
                <Login />
              </Route>
              <Route path={`${match.path}/invoice`} render={(props) => <SaleInvoice {...props}/>} />
              <Route path={`${match.path}/quoteList`} render={(props) => <QuoteList {...props}/>} />
              <Route path={`${match.path}/sales`}>
                <Sales />
              </Route>
              <Route exact path={`${match.path}/customer/:customerId`}>
                <CustomerDetails />
              </Route>
              <Route path={match.path}>
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
      
    </Layout>
  )
}
export default Admin;
