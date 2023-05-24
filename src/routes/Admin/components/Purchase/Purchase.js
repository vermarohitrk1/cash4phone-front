import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JsBarcode from "jsbarcode";
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PurchaseModal from "./Modal/PurchaseModal.js";
import { purchase, purchaseFile } from '../../api/api.js';
import { downloadBase64File } from './barcodeImage/imageDownload.js';

const { Search } = Input;

export default function Purchase() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const formData = new FormData();

  useEffect(() => {
      fetch(purchase)
        .then(res => res.json())
        .then(
          (result) => {
            // setIsLoaded(true);
            result.forEach((element, index) => {
              element['key'] = index;
              element.purchase_date = element.purchase_date.slice(0, 10);
            });
            setItems(result);
          },
          (error) => {
            // setIsLoaded(true);
            // setError(error);
          }
        )
    }, [])

  const onSearch = (value) => {
    axios.get(purchase, {
      params: value
    }).then(res => setItems(res.data))
    // console.log(value);
  }
    
  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'date',
    },
    {
      title: 'Order Number',
      dataIndex: 'order_num',
      sorter: (a, b) => a.order_num - b.order_num,
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
  ];
  const props = {
    name: 'file',
    action: purchaseFile,
    headers: {
      authorization: 'authorization-text',
    },
    data: formData,
    onChange(e) {
      formData.append('file', e.file);
      if (e.file.status !== 'uploading') {
        console.log(e.file, e.fileList);
      }
      if (e.file.status === 'done') {
        message.success(`${e.file.name} file uploaded successfully`);
      } else if (e.file.status === 'error') {
        message.error(`${e.file.name} file upload failed.`);
      }
    },
  };
    
  return (
    <div>
      <Space direction="horizontal">
       <Button type="primary" onClick={() => setopenModal(true)}>
          Add Record
       </Button>

       <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload File</Button>
       </Upload>
       <Search placeholder="Search" onSearch={onSearch} enterButton />
      </Space>

      {openModal && 
        <PurchaseModal 
            openModal={openModal}
            setopenModal={(value) => setopenModal(value)}
            title={"Purchase Entry"}
            type={"purchase"} />}
      
      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
