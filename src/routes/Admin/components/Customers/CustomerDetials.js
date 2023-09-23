import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Redirect, useParams } from "react-router-dom";
import { sales, phones } from '../../api/api.js';
import axios from 'axios';

export default function CustomerDetails (){
        const { customerId } = useParams();

        const [loading, setLoading] = useState(true);
        const [openinvoice, setOpenInvoice] = useState(false);
        const [invoiceData, setInvoiceData] = useState({hello: "world"});
        const [items, setItems] = useState([]);
        const [filter, setFilter] = useState({});

        function onClick(record) {
            axios.get(phones, {
              params: {invoice_number: record.invoice_number.slice(13)}
            }).then(res => {
              let data = { invoice: record, phones: res.data}
              console.log(data)
              setInvoiceData(data);
              setOpenInvoice(true);
            })
          }
          
        useEffect(() => {
            axios.get(sales, {
            params: {customer_id: customerId}
            }).then(res => {
            setLoading(false);
            const result = res.data
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
            });
            setItems(result);
            });
        }, [filter]);
        
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
                return <a onClick={() => onClick(record)} >Generate Invoice</a>
            } 
            }
        ];
        
        return(
            <>
                {openinvoice && <Redirect to={{ pathname: "/admin/invoice", state: invoiceData}} /> }
                <Table 
                    loading={loading} 
                    scroll={{ x: true }} 
                    columns={columns} 
                    dataSource={items} />
            </>
        )
}