import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space, Popconfirm, message, Button } from 'antd';
import JsBarcode from "jsbarcode";
import { downloadBase64File } from "../Purchase/barcodeImage/imageDownload";
import 'antd/dist/antd.css';
import { stock, purchase, deleteNotification } from '../../api/api.js';
import { StockModifyModal } from './Modal/StockModifyModal';
import { CSVLink } from "react-csv";

const { Search } = Input;

export default function Stock() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [row, setRow] = useState({});

  useEffect(() => {
    fetch(stock)
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
    
    function handleDelete (key) {

      axios.delete(purchase, {
        params: key
      })
        .then((res) => {
          if(parseInt(res.status) === 200) {
            setItems(items.filter(items => parseInt(items.order_num) != parseInt(key)));
            message.success('Entry Deleted successfully');

            axios.post(deleteNotification, {
              action: "DEL",
              order_num: key,
            }).then((res) => {console.log(res)});
            
          } else console.log(res);
        });
    }
      
    function handleModify(rowValues) {
      setOpenModifyModal(true);
      setRow(rowValues);
    }
  
  const onSearch = (value) => {
    axios.get(stock, {
      params: value
    }).then(res => setItems(res.data))
  }

  const columns = [
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'date',
    },
    {
      title: 'Order Number',
      dataIndex: 'order_num',
      key: 'order_num',
    },
    {
      title: 'Seller Mobile No',
      dataIndex: 'mobile_num',
      key: 'mobile_num',
    },
    {
      title: 'Seller Name',
      dataIndex: 'seller_name',
      key: 'seller_name',
    },
    {
      title: 'Purchase Amount',
      dataIndex: 'purchase_amount',
      key: 'purchase_amount',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'payment_mode',
      key: 'payment_mode',
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
      title: 'Box',
      dataIndex: 'box',
      key: 'box',
    },
    {
      title: 'Charger',
      dataIndex: 'charger',
      key: 'charger',
    },
    {
      title: 'Earphone',
      dataIndex: 'earphone',
      key: 'earphone',
    },
    {
      title: 'Picked By',
      dataIndex: 'picked_by',
      key: 'picked_by',
    },
    {
      title: 'Overall Condition',
      dataIndex: 'overall_condition',
      key: 'overall_condition',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (text, record, index) => {
          function click() {
            JsBarcode(`#barcode${index}`, record.barcode, {
              displayValue: true
            });
  
            const imgSrc2 = document.getElementById(`barcode${index}`).src;
            const myFilename = "barcode.png";
            downloadBase64File(imgSrc2, myFilename);
          }
        return (
          <div>
            <p>{record.barcode}</p>
            <img id={`barcode${index}`} style={{display: "none"}} alt="barcode-img"/>
            <a onClick={click}>download</a>
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        
        return (
        <Space size="middle">
          <Popconfirm title="Sure to Modify?" onConfirm={() => handleModify(record)}>
            <a>Modify</a>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.order_num)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
        )
      },
    }
  ];
  

  return (
    <div className="stock">
      <Space direction="horizontal">
        <Search placeholder="Search" onSearch={onSearch} enterButton />

        <CSVLink
          data={items}
          filename={"stocks.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <Button>Export Stocks</Button>
        </CSVLink>
      </Space>

      {openModifyModal && 
        <StockModifyModal 
            openModifyModal={openModifyModal}
            setOpenModifyModal={(value) => setOpenModifyModal(value)}
            title={"Modify Purchase"}
            row={row}
        />
        }


      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
