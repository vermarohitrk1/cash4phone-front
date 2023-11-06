import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, Space, Input, DatePicker } from 'antd';
import QuoteModal from './Modal/QuoteModal.js';
import { Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import { quoteItems, getQuotes } from '../../api/api.js';
import { CSVLink } from "react-csv";
import axios from 'axios';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function Qoutes() {
  const [loading, setLoading] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [items, setItems] = useState([]);
  const [openQuote, setOpenQuote] = useState(false);
  const [quoteData, setQuoteData] = useState({hello: "world"});
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    axios.get(getQuotes).then(res => {
      setLoading(false);
      const result = res.data
      setItems(result)
    });
  }, [forceRender]);

  const onSearch = (params) => {
    console.log(params)
  }

  function onClick(record) {

    axios.get(quoteItems, {
      params: {quote_id: record.id}
    }).then(res => {
      let data = { quote: record, phones: res.data}
      console.log(data)
      setQuoteData(data);
      setOpenQuote(true);
    })
  }

  function handleModify(rowValues) {
  }

  const updateTable = () => {
    setForceRender(prev => !prev);
  };

const columns = [
  {
    title: 'Vendor Name',
    dataIndex: 'vendor_name',
    key: 'vendor_name',
  },
  {
    title: 'Vendor Phone',
    dataIndex: 'vendor_phone',
    key: 'vendor_phone',
  },
  {
    title: 'Qoute List',
    key: 'invoice',
    fixed: 'right',
    width: 50,
    render: (record) => {
      return <a onClick={() => onClick(record)} >View</a>
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
      {openQuote && <Redirect to={{ pathname: "/admin/quoteList", state: quoteData}} /> }
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

        <Button type="primary" onClick={() => setopenModal(true)}>
            Create Vendor Quote
        </Button>

      </Space>
        
      {openModal && 
          <QuoteModal
              openModal={openModal}
              setopenModal={(value) => setopenModal(value)}
              title={"Quote Entry"}
              updateTable={updateTable} 
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
