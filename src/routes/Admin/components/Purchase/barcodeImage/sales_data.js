import 'antd/dist/antd.css';

import axios from 'axios';
import { phones } from '../../../api/api';

export const columns = [
  {
    title: 'Sale Date',
    dataIndex: 'sale_date',
    key: 'sale_date',
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number',
    key: 'invoice_number',
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
      function onClick() {
        console.log(record);
        axios.get(phones, {
          params: record.invoice_number
        }).then(res => console.log(res.data))
      }

      return ( <a onClick={onClick} >create invoice</a> )
    } 
  },
];


