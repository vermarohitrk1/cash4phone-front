import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message, Typography } from 'antd';
import { customer_update } from './../../api/api.js';
import axios from 'axios';
const { Text } = Typography;


const CustomerEditForm = (props) => {
    const { updateCustomerRow } = props;
  
       const onFinish = (values) => {
  
        values.invoice_number = props.row.invoice_number_unique;
        axios.patch(customer_update, values)
          .then((res) => {
            if(res.status === 200) {
              
              message.success('Entry Modified successfully');
            }
            props.setOpenModal(false);
          });
      };
    
      return (
        <Form name="nest-messages" onFinish={onFinish} autoComplete="off">
          
          <Form.Item 
                name={['buyer_num']} 
                label="Customer Mobile"
                
              >
                <Input type="number" defaultValue={props.row.buyer_num}/>
              </Form.Item>
    
          <Form.Item
            name={['buyer_name']}
            label="Buyer Name"
          >
        <Input  defaultValue={props.row.buyer_name}/>
          </Form.Item>
      
    
          <Form.Item name={['supply_place']} label="Place of Supply" 
            >
            <Input defaultValue={props.row.supply_place}/>
          </Form.Item>
    
          <Form.Item name={['state_code']} label="State Code" 
            >
            <Input defaultValue={props.row.state_code}/>
          </Form.Item>
    
          <Form.Item name={['shipping_address']} label="Shipping Address">
            <Input defaultValue={props.row.shipping_address}/>
          </Form.Item>
    
          <Form.Item name={['eway_number']} label="E-Way Number">
            <Input defaultValue={props.row.eway_number}/>
          </Form.Item>
  
          <Form.Item wrapperCol={{ offset: 22 }}>
          
              <Button type="primary" htmlType="submit" disabled>
                Update
              </Button>     
        </Form.Item>
        </Form>
      );
    };
  
  export {CustomerEditForm};