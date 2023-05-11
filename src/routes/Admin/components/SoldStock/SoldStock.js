import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space } from 'antd';
import 'antd/dist/antd.css';
import { phones, searchPhones } from '../../api/api.js';

const { Search } = Input;

export default function SoldStock() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(phones)
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
    }, [])
    
  const onSearch = (value) => {
    axios.get(searchPhones, {
      params: value
    }).then(res => setItems(res.data))
  }

  const columns = [
    {
      title: 'Purchase Order Number',
      dataIndex: 'order_num',
      key: 'order_num',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'IMEI Number',
      dataIndex: 'imei_num',
      key: 'imei_num',
    },
    {
      title: 'Phone Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Phone Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
    },
    {
      title: 'Selling Price',
      dataIndex: 'selling_price',
      key: 'selling_price',
    },
    {
      title: 'Margin',
      dataIndex: 'margin',
      key: 'margin',
    },
    {
      title: 'Item GST',
      dataIndex: 'item_gst',
      key: 'item_gst',
    },
  ];
  

  return (
    <div className="stock">
      <Space direction="vertical">
        <Search placeholder="enter imei number" onSearch={onSearch} enterButton />
      </Space>

      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
