import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, Space, Input } from 'antd';
import SalesModal from './Modal/SalesModal.js';
import { Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import { sales, phones } from '../../api/api.js';
import { CSVLink } from "react-csv";
import axios from 'axios';

const { Search } = Input;

export default function Sales() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [items, setItems] = useState([]);
  const [row, setRow] = useState({});

  const [soldItems, setSoldItems] = useState([]);
  const [openinvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({hello: "world"});

  function handleCLick() {
    fetch(phones)
        .then(res => res.json())
        .then(
          (phones) => {
            // setIsLoaded(true);
            setSoldItems(phones);
          },
          (error) => {
            // setIsLoaded(true);
            // setError(error);
          }
        )

    fetch(sales)
    .then(res => res.json())
    .then(
      (result) => {
        // setIsLoaded(true);
        result.forEach(element => {
          element['key'] = element.invoice_number;
          element.sale_date = element.sale_date.slice(0, 10);
          if(element.sale_date <= '2022-03-31') {
            element.invoice_number_unique = element.invoice_number;
            element.invoice_number = "KNOV/2022-23/" + element.invoice_number;
          } else {
            element.invoice_number_unique = element.invoice_number;
            element.invoice_number = "KNOV/2023-24/" + element.invoice_number;

          }
          // element.invoice_number = "KNOV/2021-22/" + element.invoice_number;
        });
        setItems(result);
      },
      (error) => {
        // setIsLoaded(true);
        // setError(error);
      }
    )
  };

  useEffect(() => {
      handleCLick();
    }, []
  );

  const onSearch = (value) => {
    axios.get(sales, {
      params: value
    }).then(res => setItems(res.data))
    // console.log(value);
  }

  function onClick(record) {

    axios.get(phones, {
      params: record.invoice_number.slice(13)
    }).then(res => {
      let data = { invoice: record, phones: res.data}
      setInvoiceData(data);
      setOpenInvoice(true);
    })
  }

  function handleModify(rowValues) {
    setOpenEditModal(true);
    setRow(rowValues);
  }
  
const columns = [
  {
    title: 'Sale Date',
    dataIndex: 'sale_date',
    key: 'sale_date',
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number',
    key: 'invoice_number'
  },
  // {
  //   title: 'Order Number',
  //   dataIndex: 'sale_order_num',
  //   key: 'sale_order_num',
  // },
  {
    title: 'Buyer Number',
    dataIndex: 'buyer_num',
    key: 'buyer_num',
  },
  {
    title: 'Buyer Name',
    dataIndex: 'buyer_name',
    key: 'buyer_name',
  },
  {
    title: 'GSTIN',
    dataIndex: 'gst_number',
    key: 'gst_number',
  },
  {
    title: 'PAN',
    dataIndex: 'pan_number',
    key: 'pan_number',
  },
  {
    title: 'Payment Reference Number',
    dataIndex: 'payment_ref_num',
    key: 'payment_ref_num',
  },
  {
    title: 'Cash Payment',
    dataIndex: 'payment_cash',
    key: 'payment_cash',
  },
  {
    title: 'Card Payment',
    dataIndex: 'payment_card',
    key: 'payment_card',
  },
  {
    title: 'Transfer Payment',
    dataIndex: 'payment_transfer',
    key: 'payment_transfer',
  },
  {
    title: 'Selling Amount',
    dataIndex: 'selling_amount',
    key: 'selling_amount',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'GST Amount',
    dataIndex: 'gst_amt',
    key: 'gst_amt',
  },
  {
    title: 'Billing Address',
    dataIndex: 'billing_address',
    key: 'billing_address',
  },
  {
    title: 'Place of Supply',
    dataIndex: 'supply_place',
    key: 'supply_place',
  },
  {
    title: 'State Code',
    dataIndex: 'state_code',
    key: 'state_code',
  },
  {
    title: 'Shipping Address',
    dataIndex: 'shipping_address',
    key: 'shipping_address',
  },
  {
    title: 'Invoice',
    key: 'invoice',
    fixed: 'right',
    width: 100,
    render: (record) => {
      return <a onClick={() => onClick(record)} >create invoice</a>
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
      </Space>
      )
    },
  }
];

  return (
    <div className="sales">
      {openinvoice && <Redirect to={{ pathname: "/admin/invoice", state: invoiceData}} /> }
      <Space direction="horizontal">
        <Button type="primary" onClick={() => setopenModal(true)}>
            Add Record
        </Button>

        <Search placeholder="enter invoice number" onSearch={onSearch} enterButton />
      </Space>
        
      {openModal && 
          <SalesModal 
              openModal={openModal}
              setopenModal={(value) => setopenModal(value)}
              type={"sales"}
              title={"Sales Entry"}
          />
      }
      {openEditModal && 
          <SalesModal 
              openModal={openEditModal}
              setopenModal={(value) => setOpenEditModal(value)}
              type={"sales_edit"}
              title={"Edit Sales Entry"}
            row={row}
          />
      }
      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
      <CSVLink
        data={items}
        filename={"sales.csv"}
        className="btn btn-primary"
        target="_blank"
      >
      <Button>Download Invoices</Button>
      </CSVLink>

      {/* <Button onClick={handleCLick}>
      Download Sold Items
      </Button> */}

      <CSVLink
        data={soldItems}
        filename={"items.csv"}
        className="btn btn-primary"
        target="_blank"
      >
      <Button>Download Sold Items</Button>
      </CSVLink>
    </div>
  )
}
