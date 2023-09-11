import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, Popconfirm } from 'antd';
import { GET_customers } from '../../api/api';
import CustomerModal from './Modal/CustomerModal.js';

const { Search } = Input;

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [row, setRow] = useState({});
  
    const onSearch = (value) => {
        axios.get(GET_customers, {
        params: {search: value}
        }).then(res => setCustomers(res.data))
        // console.log(value);
    }

    useEffect(() => {
        console.log(GET_customers)
        axios.get(GET_customers)
        .then((res) => {
            setCustomers(res.data);
        })
    }, [])

    function handleModify(rowValues) {
        setOpenEditModal(true);
        setRow(rowValues);
    }

    function updateCustomerRow(){

    }
    
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'GSTIN',
      dataIndex: 'gstin',
      key: 'gstin',
    },
    {
      title: 'PAN',
      dataIndex: 'pan',
      key: 'pan',
    },
    {
      title: 'Billing Address',
      dataIndex: 'billing_address',
      key: 'billing_address',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
    },
    {
      title: 'Supply Place',
      dataIndex: 'supply_place',
      key: 'supply_place',
    },
    {
      title: 'State Code',
      dataIndex: 'state_code',
      key: 'state_code',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        
        return (
        <Space size="middle">
            <a onClick={() => handleModify(record)}>Modify</a>
        </Space>
        )
      },
    }
  ];
  
    
  return (
    <div>
        <Space direction="horizontal">
            <Search placeholder="Search" onSearch={onSearch} enterButton />
        </Space>
        {openEditModal &&
            <SalesModal 
              openModal={openEditModal}
              setopenModal={(value) => setOpenEditModal(value)}
              type={"customer_edit"}
              title={"Edit Customer"}
              updateCustomerRow={updateCustomerRow}
            row={row}
          />
        }

      <Table loading={ customers.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={customers} />
    </div>
  )
}

