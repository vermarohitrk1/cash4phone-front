import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, DatePicker, Typography, Tooltip } from 'antd';
import { CSVLink } from "react-csv";
import { payouts } from '../../api/api.js';

const { Search } = Input;
const { Text } = Typography;

export default function Payouts() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const [forceRender, setForceRender] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    axios.get(payouts, {
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
    }, [filter, forceRender])

  const onSearch = (params) => {
    var params = {...filter, ...params}
    setFilter(params)
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(date)),
    },
    {
      title: 'Order No.',
      dataIndex: 'unique_request_number',
      key: 'unique_request_number',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Account Holder',
      dataIndex: 'beneficiary_account_name',
      key: 'beneficiary_account_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record, index) => {
        return (
          <>
          {status == 'success' &&
            <Text type="success">Success</Text>
          }
          {status == 'failure' &&
            <Tooltip placement="topLeft" title={record.failure_reason}>
              <Text type="danger">Failure</Text>
            </Tooltip>
          }
          </>
        )
      }
    }
  ];
    
  return (
    <div>
      <Space direction="horizontal">
      
      <CSVLink
          data={items}
          filename={"payouts.csv"}
          className="btn btn-primary"
          target="_blank"
        >
            <Button type="default">Export</Button>
        </CSVLink>
       <Search placeholder="Search" onSearch={value => onSearch({ search: value })} enterButton />
      </Space>
      
      <Table loading={loading} scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
