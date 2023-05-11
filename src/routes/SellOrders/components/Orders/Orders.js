import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, Popconfirm } from 'antd';
// import { cityAdmin } from '../../api/api';
// import CityPriceModal from './CityPriceModal';

const { Search } = Input;

export default function Orders({ items }) {
//   const [items, setItems] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [value, setValue] = useState({});

//   const onSearch = (value) => {
//     axios.get(purchase, {
//       params: value
//     }).then(res => setItems(res.data))
//     // console.log(value);
//   }

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
      
      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}

