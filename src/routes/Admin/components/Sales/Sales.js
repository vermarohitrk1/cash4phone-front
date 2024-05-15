import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, Space, Input, DatePicker } from 'antd';
import SalesModal from './Modal/SalesModal.js';
import { Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import { sales, phones } from '../../api/api.js';
import { CSVLink } from "react-csv";
import axios from 'axios';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function Sales() {
  const [loading, setLoading] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [items, setItems] = useState([]);
  const [row, setRow] = useState({});

  const [openinvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({hello: "world"});
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
    axios.get(sales, {
      params: filter
    }).then(res => {
      setLoading(false);
      const result = res.data
      result.forEach(element => {
        element['key'] = element.invoice_number;
        element.sale_date = element.sale_date.slice(0, 10);
        // if(element.sale_date <= '2022-03-31') {
        //   element.invoice_number_unique = element.invoice_number;
        //   element.invoice_number = "KNOV/2022-23/" + element.invoice_number;
        // } else {
        //   element.invoice_number_unique = element.invoice_number;
        //   element.invoice_number = "KNOV/2023-24/" + element.invoice_number;
        // }
        const saleDate = new Date(element.sale_date);
        let fiscalYearStart, fiscalYearEnd;

        if (saleDate.getMonth() <= 2 && saleDate.getDate() <= 31) {
          fiscalYearStart = saleDate.getFullYear() - 1;
          fiscalYearEnd = saleDate.getFullYear();
        } else {
          fiscalYearStart = saleDate.getFullYear();
          fiscalYearEnd = saleDate.getFullYear() + 1;
        }

        const fiscalYear = `${fiscalYearStart}-${fiscalYearEnd.toString().slice(-2)}`;

        element.invoice_number_unique = element.invoice_number;
        element.invoice_number = `KNOV/${fiscalYear}/` + element.invoice_number;
        
      });
      setItems(result);
    });
  }, [filter, forceRender]);

  const onSearch = (params) => {
    var params = {...filter, ...params}
    // console.log(params)
    setFilter(params)
  }

  function onClick(record) {

    axios.get(phones, {
      params: {invoice_number: record.invoice_number.slice(13)}
    }).then(res => {
      let data = { invoice: record, phones: res.data}
      // console.log(data)
      setInvoiceData(data);
      setOpenInvoice(true);
    })
  }

  function handleModify(rowValues) {
    setOpenEditModal(true);
    setRow(rowValues);
  }

  const updateSales = () => {
    setForceRender(prev => !prev);
  };

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
      <Space direction="horizontal" align="left">
        <CSVLink
          data={items}
          filename={"sales.csv"}
          className="btn btn-primary"
          target="_blank"
        >
        <Button type="primary">Export</Button>
        </CSVLink>

        {/* <Button onClick={handleCLick}>
        Download Sold Items
        </Button> */}

        <RangePicker onChange={handleDateRangeChange} />
        <Button type="primary" onClick={() => setopenModal(true)}>
            Add Record
        </Button>

        <Search 
          placeholder="Enter Invoice or Buyer No."
          onSearch={value => onSearch({ search: value })}
          enterButton />
      </Space>
        
      {openModal && 
          <SalesModal 
              openModal={openModal}
              setopenModal={(value) => setopenModal(value)}
              type={"sales"}
              title={"Sales Entry"}
              updateSales={updateSales} 
          />
      }
      {openEditModal && 
          <SalesModal 
              openModal={openEditModal}
              setopenModal={(value) => setOpenEditModal(value)}
              type={"sales_edit"}
              title={"Edit Sales Entry"}
              updateSales={updateSales} 
            row={row}
          />
      }
      <Table 
      loading={loading} 
      scroll={{ x: true }} 
      columns={columns} 
      dataSource={items} />
      
    </div>
  )
}
