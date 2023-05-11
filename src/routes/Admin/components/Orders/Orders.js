import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import { orders, product as getSingleProduct } from '../../api/api.js';
import { ProductDetailModal } from './Modals/ProductDetailModal.js';

const { Search } = Input;

export default function Orders() {

  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    axios.get(orders)
      .then((res) => {
        setItems(res.data);
      })
    }, [])
    
    function productDetails (productId) {
    //   console.log("Website stock productDetails productId ", productId);

      axios.post(getSingleProduct, {
          productId: productId
      })
      .then((res) => {
        // console.log("data received is ", res.data[0]);
        setProduct(res.data[0]);
      })
      .then((res) => {
        setOpenModal(true);
      })
    }
      
    function userDetails(rowValues) {
      console.log("Website stock handleModify rowValues ", rowValues);
      // setOpenModifyModal(true);
      // setRow(rowValues);
    }
  
  const onSearch = (e) => {
    axios.get(orders, {
      params: e.target.value
    }).then(res => setItems(res.data))
  }

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'id',
      key: 'id',
    },
    // {
    //   title: 'Product Id',
    //   dataIndex: 'product_id',
    //   key: 'product_id',
    // },
    // {
    //   title: 'User Id',
    //   dataIndex: 'user_id',
    //   key: 'user_id',
    // },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'User Phone',
      dataIndex: 'user_phone',
      key: 'user_phone',
    },
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: 'Order City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Order State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Order Pincode',
      dataIndex: 'pincode',
      key: 'pincode',
    },
    {
      title: 'Full Address',
      dataIndex: 'full_address',
      key: 'full_address',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'payment_mode',
      key: 'refurbished_status',
    },
    {
      title: 'Price Paid',
      dataIndex: 'price_paid',
      key: 'box',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        
        return (
        <Space size="middle">
          {/* <Popconfirm title="Fetch User Details?" onConfirm={() => userDetails(record)}>
            <a>User Details</a>
          </Popconfirm> */}
          <Button onClick={() => productDetails(record.product_id)}>
            Product Detail
          </Button>
        </Space>
        )
      },
    }
  ];
  

  return (
    <div className="stock">
      <Space direction="vertical">
        <Search placeholder="Enter Order Number" onChange={onSearch} enterButton />
      </Space>

      {openModal && 
        <ProductDetailModal 
            openModal={openModal}
            setOpenModal={(value) => setOpenModal(value)}
            title={"Product Detail"}
            product={product}
        />
      }

      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
