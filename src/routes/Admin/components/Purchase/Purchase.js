import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JsBarcode from "jsbarcode";
import 'antd/dist/antd.css';
import { Table, Button, Input, Upload, message, Space, DatePicker, Typography, Tooltip } from 'antd';
import { CSVLink } from "react-csv";
import { UploadOutlined } from '@ant-design/icons';
import PurchaseModal from "./Modal/PurchaseModal.js";
import { purchase, purchaseFile } from '../../api/api.js';
import { downloadBase64File } from './barcodeImage/imageDownload.js';

const { Search } = Input;
const { Text } = Typography;

export default function Purchase() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [filter, setFilter] = useState(null);
  const [forceRender, setForceRender] = useState(false);
  const formData = new FormData();

  const { RangePicker } = DatePicker;

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
    axios.get(purchase, {
      params: filter
      })
        .then(
          (res) => {
            setLoading(false);
            const result = res.data
            // result.forEach((element, index) => {
            //   element['key'] = index;
            //   element.purchase_date = element.purchase_date.slice(0, 10);
            // });
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
    
  const updateTable = () => {
    setForceRender(prev => !prev);
  };

  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      key: 'id',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'date',
      render: (date) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(date)),
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
      title: 'Kyc Doc',
      dataIndex: 'kyc_pdf',
      key: 'kyc_pdf',
      render: (kyc_pdf, record, index) => {
        return(
          <>
          {kyc_pdf != null &&
          <a href={kyc_pdf} target="_blank" rel="noopener noreferrer">
            PDF
          </a>
          }
          </>
        )
      }
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
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
            {status == null &&
              'N/A'
            }
          </>
        )
      }
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
            downloadBase64File(imgSrc2, myFilename, index, record);

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
      
      <CSVLink
          data={items}
          filename={"purchases.csv"}
          className="btn btn-primary"
          target="_blank"
        >
        <Button type="default">Export</Button>
        </CSVLink>

       <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload File</Button>
       </Upload>
        <RangePicker onChange={handleDateRangeChange} format="DD-MM-YYYY"/>
       <Button type="primary" onClick={() => setopenModal(true)}>
          Add Record
       </Button>
       <Search placeholder="Search" onSearch={value => onSearch({ search: value })} enterButton />
      </Space>

      {openModal && 
        <PurchaseModal 
            openModal={openModal}
            setopenModal={(value) => setopenModal(value)}
            title={"Purchase Entry"}
            type={"purchase"}
            updateTable={updateTable} />}
      
      <Table loading={loading} scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
