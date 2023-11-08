import './../style.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space, Popconfirm, message, Button, DatePicker } from 'antd';
import JsBarcode from "jsbarcode";
import { downloadBase64File } from "../Purchase/barcodeImage/imageDownload";
import 'antd/dist/antd.css';
import { stock, purchase, deleteNotification, priceInput } from '../../api/api.js';
import { StockModifyModal } from './Modal/StockModifyModal';
import { CSVLink } from "react-csv";

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function Stock() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [row, setRow] = useState({});
  const [filter, setFilter] = useState({});
  const [forceRender, setForceRender] = useState(false);

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
    axios.get(stock, {
      params: filter
    })
      .then(
        (res) => {
          setLoading(false);
          const result = res.data
          console.log(result)
          setItems(result);
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
    }, [filter, forceRender])


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
  
  const onSearch = (params) => {
    console.log(params)
    var params = {...filter, ...params}
    setFilter(params)
  }
  
  const updateTable = () => {
    setForceRender(prev => !prev);
  };

  const handleInputBlur = (e, defaultValue, id) => {
    const { name, value } = e.target;

    if(defaultValue === value){
      return;
    }
    if(isNaN(value)){
      message.error('The price should numeric value.');
      return;
    }

    const values = {
      [name]: value,
      id
    };
    
    axios.patch(priceInput, values)
      .then((res) => {
        if(res.status === 200) {
          message.success('Entry Modified successfully');
        }
      })
  };

  const columns = [
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'date',
      render: (date) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(date)),
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
      title: 'Box / Chanrger / Earphone',
      dataIndex: 'box',
      key: 'box',
      render: (box, record, index) => {
        return `${record.box}/${record.charger}/${record.earphone}`;
      }
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
      title: 'Vendor Price',
      dataIndex: 'vendor_price',
      key: 'vendor_price',
      sorter: (a, b) => {
        // Handle undefined or empty values
        const aValue = typeof a.vendor_price === 'number' ? a.vendor_price : 0;
        const bValue = typeof b.vendor_price === 'number' ? b.vendor_price : 0;
  
        return aValue - bValue;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      sorter: (a, b) => {
        // Handle undefined or empty values
        const aValue = typeof a.retail_price === 'number' ? a.retail_price : 0;
        const bValue = typeof b.retail_price === 'number' ? b.retail_price : 0;
  
        return aValue - bValue;
      },
      sortDirections: ['descend', 'ascend'],
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
            <a onClick={() => handleModify(record)}>Modify</a>
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
      <Space direction="horizontal" align="left">

        <CSVLink
          data={items}
          filename={"stocks.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <Button>Export</Button>
        </CSVLink>
        <RangePicker onChange={handleDateRangeChange} />
        <Search placeholder="Search" 
          onSearch={value => onSearch({ search: value })} enterButton />
      </Space>

      {openModifyModal && 
        <StockModifyModal 
            openModifyModal={openModifyModal}
            setOpenModifyModal={(value) => setOpenModifyModal(value)}
            title={"Modify Purchase"}
            row={row}
            updateTable={updateTable}
        />
        }


      <Table loading={loading} scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
