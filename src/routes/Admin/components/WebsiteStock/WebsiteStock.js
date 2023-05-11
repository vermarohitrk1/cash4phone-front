import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Space, Popconfirm, message, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { websiteStock, buyStockFile, product } from '../../api/api.js';
// import { StockModifyModal } from './Modal/StockModifyModal';
import { WebsiteStockModifyModal } from './Modify/WebsiteStockModifyModal.jsx';

const { Search } = Input;

export default function WebsiteStock() {

  const [items, setItems] = useState([]);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [row, setRow] = useState({});
  const formData = new FormData();

  useEffect(() => {
    axios.get(websiteStock)
      .then((res) => {
        // console.log("data received from website stock", res.data);
        res.data.forEach(element => {
          element['key'] = element.id
        });
        setItems(res.data);

      })
    }, [])
    
    function handleDelete (id) {
      // console.log("Website stock handleDelete key ", id);

      axios.delete(product, {
        params: id
      })
        .then((res) => {
          if(parseInt(res.status) === 200) {
            setItems(items.filter(items => parseInt(items.id) != parseInt(id)));
            message.success('Entry Deleted successfully');

            // axios.post(deleteNotification, {
            //   action: "DEL",
            //   order_num: key,
            // }).then((res) => {console.log(res)});
            
          } else console.log(res);
        });
    }
      
    function handleModify(rowValues) {
      // console.log("Website stock handleModify rowValues ", rowValues);
      setRow(rowValues);
      setOpenModifyModal(true);
    }
  
  const onSearch = (e) => {
    console.log("Website stock onSearch value ", e.target.value);
    axios.get(websiteStock, {
      params: e.target.value
    }).then(res => setItems(res.data))
  }

  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Marked Price',
      dataIndex: 'marked_price',
      key: 'marked_price',
    },
    {
      title: 'Ram',
      dataIndex: 'ram',
      key: 'ram',
    },
    {
      title: 'Internal Storage',
      dataIndex: 'internal_storage',
      key: 'internal_storage',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'IMEI Number',
      dataIndex: 'imei_num',
      key: 'box',
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    // },
    {
      title: 'Refurbished Status',
      dataIndex: 'refurbished_status',
      key: 'refurbished_status',
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
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        
        return (
        <Space size="middle">
          <Popconfirm title="Sure to Modify?" onConfirm={() => handleModify(record)}>
            <a>Modify</a>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
        )
      },
    }
  ];
  
  const props = {
    name: 'file',
    action: buyStockFile,
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
				window.location.reload();
      } else if (e.file.status === 'error') {
        message.error(`${e.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="stock">
      
      <Space direction="horizontal">
        <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
        <Search placeholder="Enter Model" onChange={onSearch} enterButton />
      </Space>

      {openModifyModal && 
        <WebsiteStockModifyModal 
            openModifyModal={openModifyModal}
            setOpenModifyModal={(value) => setOpenModifyModal(value)}
            title={"Modify " + row.model}
            row={row}
        />
      }

      <Table loading={ items.length ? false : true } scroll={{ x: true }} columns={columns} dataSource={items} />
    </div>
  )
}
