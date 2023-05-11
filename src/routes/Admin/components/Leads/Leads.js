import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, Popconfirm } from 'antd';
import { sellorders } from '../../api/api';

const { Search } = Input;

export default function Leads() {
  const [orders, setOrders] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [value, setValue] = useState({});

//   const onSearch = (value) => {
//     axios.get(purchase, {
//       params: value
//     }).then(res => setOrders(res.data))
//     // console.log(value);
//   }

    useEffect(() => {
        axios.get(sellorders)
        .then((res) => {
            res.data.forEach(element => {
            element['key'] = element.id;
            element['timeSlot'] = element.fromTime + ' to ' + element.toTime;
            // element.createTime = element.createTime.slice(0,10); 
            });
            setOrders(res.data);
        })
    }, [])

    const handleModify = (record) => {
        setValue(record);
        setopenModal(true);
    }
    
  const columns = [
    {
      title: 'Order No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'order4',
      key: 'order4',
    },
    {
      title: 'User name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    // {
    //   title: 'Answers',
    //   dataIndex: 'answers',
    //   key: 'answers',
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Payment',
      dataIndex: 'payment_mode',
      key: 'payment_mode',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'DateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'TimeSlot',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
  ];
  
    
  return (
    <div>
      <Space direction="horizontal">
       {/* <Search placeholder="enter imei number" onSearch={onSearch} enterButton /> */}
      </Space>

      {/* {openModal && 
        <CityPriceModal 
            openModal={openModal}
            setopenModal={(value) => setopenModal(value)}
            title={"Change Price of " + cityName}
            type={"purchase"}
            value={value} 
            cityName={cityName}
        />} */}
      
      <Table loading={ orders.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={orders} />
    </div>
  )
}

