import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { CSVLink } from "react-csv";
import { phones, searchPhones } from '../../api/api.js';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function SoldStock() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);

  // Function to handle date range change
  const handleDateRangeChange = (dates) => {
    if (dates) {
      const [startDate, endDate] = dates;
      onSearch({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') })
    } else {
      const { startDate = null, endDate = null, ...newState } = filter;
      setFilter(newState)
    }
  };

  useEffect(() => {
    axios.get(phones, {
      params: filter
      })
      .then(
        (res) => {
          setLoading(false);
          const result = res.data
          setItems(result);
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
    }, [filter]);
    
  const onSearch = (params) => {
    var params = {...filter, ...params}
    setFilter(params)
  }

  const columns = [
    {
      title: 'Sale Date',
      dataIndex: 'sale_date',
      key: 'sale_date',
      render: (date) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(date)),
    },
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
    
    
      <Space direction="horizontal" align="left">
      <CSVLink
          data={items}
          filename={"items.csv"}
          className="btn btn-primary"
          target="_blank"
        >
        <Button type="default">Export</Button>
        </CSVLink>
        <RangePicker onChange={handleDateRangeChange} format="DD-MM-YYYY"/>
        <Search placeholder="Enter imei number" 
          onSearch={value => onSearch({ search: value })} enterButton />
      </Space>

      <Table loading={loading} scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
