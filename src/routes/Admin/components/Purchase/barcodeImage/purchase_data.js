import 'antd/dist/antd.css';
import JsBarcode from "jsbarcode";
import { downloadBase64File } from "./imageDownload";
import { Space, Popconfirm } from 'antd';
import axios from 'axios';
import { purchase } from '../../../api/api';



export const columns = [
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
];
