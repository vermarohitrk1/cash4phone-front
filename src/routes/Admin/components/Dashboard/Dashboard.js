import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './dashboard.css'
import {dashboard} from "../../api/api";
import { Table, Button, Input, Upload, message, Space, Popconfirm, DatePicker } from 'antd';
import { UserOutlined, AreaChartOutlined, DropboxOutlined, StockOutlined, ShoppingCartOutlined, BarChartOutlined, RiseOutlined } from '@ant-design/icons';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const { Search } = Input;
const { RangePicker } = DatePicker;

export default function Dashboard() {
    
  const [purchase, setPurchase] = useState({});
  const [sales, setSalses] = useState({});
  const [cards, setCards] = useState({});
  const [filter, setFilter] = useState({});
  const [forceRender, setForceRender] = useState(false);
  
  // Function to handle date range change
  const handleDateRangeChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setFilter({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') })
    } else {
      const { startDate = null, endDate = null, ...newState } = filter;
      setFilter(newState)
    }
  };

  useEffect(() => {
    axios.get(dashboard, {
      params: filter
    })
      .then((res) => {
        // res.data.forEach(element => {
          const data = res.data;
          setPurchase(data.purchases);
          setSalses(data.sales);
          setCards(data.cards);
        // });
      })
  },[filter]);

    const IconCountCard = ({className, icon, count, title }) => {
      return (
        <div className={'card white '+className}>
          <div className="card-content">
            <div className="card-body d-block">
              <div className="media d-flex mb-3">
                <div className="media-body text-right">
                  <h3>{count}</h3>
                  <span>{title}</span>
                </div>
                <div className="align-self-center">
                {React.cloneElement(icon, { size: 36 })}
                </div>
              </div>
                  <ProgressBar variant={className} now={count} />
            </div>
          </div>
        </div>
      );
    };

  return (
    <div>
    <Row>
        <Col md={4}>
          <IconCountCard className="info" icon={<ShoppingCartOutlined />} count={cards && cards.today_purchase} title="Today Purchase" />
        </Col>
        <Col md={4}>
          <IconCountCard className="warning" icon={<AreaChartOutlined />} count={cards && cards.today_sale} title="Toaday Sale" />
        </Col>
        <Col md={4}>
          <IconCountCard className="success" icon={<StockOutlined />} count={cards && cards.today_sold_stock} title="Today Sold Stock" />
        </Col>
    </Row>

    <Row>
        <Col md={4}>
          <IconCountCard className="purple" icon={<ShoppingCartOutlined />} count={cards && cards.yesterday_purchase} title="Yesterdy Purchase" />
        </Col>
        <Col md={4}>
          <IconCountCard className="pink" icon={<AreaChartOutlined />} count={cards && cards.yesterday_sale} title="Yesterdy Sale" />
        </Col>
        <Col md={4}>
          <IconCountCard className="yellow" icon={<StockOutlined />} count={cards && cards.yesterday_sold_stock} title="Yesterdy Sold Stock" />
        </Col>
    </Row>
        <RangePicker onChange={handleDateRangeChange} />
    <Row>
        <Col md={4}>
          <IconCountCard className="danger" icon={<DropboxOutlined />} count={cards && cards.total_purchase} title="Total Purchase" />
        </Col>
        <Col md={4}>
          <IconCountCard className="blue" icon={<RiseOutlined />} count={cards && cards.total_sale} title="Total Sales" />
        </Col>
        <Col md={4}>
          <IconCountCard className="primary" icon={<BarChartOutlined />} count={cards && cards.total_sold_stock} title="Total Sold Stock" />
        </Col>
    </Row>
    <Row>
        <Col md={4}>
          <IconCountCard className="gray" icon={<RiseOutlined />} count={cards && cards.total_margin} title="Total Margin" />
        </Col>
        <Col md={4}>
          <IconCountCard className="indigo" icon={<RiseOutlined />} count={cards && cards.today_margin} title="Today Total Margin" />
        </Col>
        <Col md={4}>
          <IconCountCard className="secondry" icon={<BarChartOutlined />} count={cards && cards.total_stock} title="Total Available Stock" />
        </Col>
    </Row>

    <Row style={{maxHeight:"500px"}}>
        <Col md={6}>
        <h3>Purchases</h3>
        </Col>
        <Col md={6}>
        <h3>Sales</h3>
        </Col>
        <Col md={6}>
          <BarChart width={500} height={300} data={purchase}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="This Week" fill="#8884d8" />
          </BarChart>
        </Col>
        <Col md={6}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="this_week" name="This Week" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="last_week" name="Last Week" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
  </div>
  )
}

