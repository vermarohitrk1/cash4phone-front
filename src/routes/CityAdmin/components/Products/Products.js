import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, Popconfirm } from 'antd';
import { cityAdmin } from '../../api/api';
import CityPriceModal from './CityPriceModal';

const { Search } = Input;

export default function Products({ cityName, items, setItems }) {
  const [openModal, setopenModal] = useState(false);
  const [value, setValue] = useState({});

  const onSearch = (value) => {
    axios.post(cityAdmin, {
      city: cityName,
      name: value
    })
    .then((res) => {
        res.data.forEach(element => {
            element['key'] = element.id;
            element.createTime = element.createTime.slice(0,10);
        });
        setItems(res.data);
    });
  }

    const handleModify = (record) => {
        setValue(record);
        setopenModal(true);
    }
    
  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Model Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Max. Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Created On',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (text, record) => {
          
          return (
          <Space size="middle">
            <Popconfirm title={`change price for ${cityName}?`} onConfirm={() => handleModify(record)}>
              <a>Change Price</a>
            </Popconfirm>
          </Space>
          )
        },
      }
  ];
  
    
  return (
    <div>
      <Space direction="horizontal">
       <Search placeholder="Enter Model Name" onSearch={onSearch} enterButton />
      </Space>

      {openModal && 
        <CityPriceModal 
            openModal={openModal}
            setopenModal={(value) => setopenModal(value)}
            title={"Change Price of " + cityName}
            type={"purchase"}
            value={value} 
            cityName={cityName}
        />}
      
      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}

