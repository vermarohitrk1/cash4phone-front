import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message, Typography } from 'antd';
import { customer_update } from './../../api/api.js';
import axios from 'axios';
const { Text } = Typography;
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CustomerEditForm = (props) => {
    const { updateCustomerRow } = props;
  
       const onFinish = (values) => {
  
        values.id = props.row.id;
        axios.patch(customer_update, values)
          .then((res) => {
            if(res.status === 200) {
              updateCustomerRow()
              message.success('Entry Modified successfully');
            }
            props.setOpenModal(false);
          });
      };
    
      return (
        <Form name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
         autoComplete="off"
         initialValues={{
          buyer_num: props.row.mobile,
          buyer_name: props.row.name,
          gst_number: props.row.gstin,
          pan_number: props.row.pan,
          billing_address: props.row.billing_address,
          supply_place: props.row.supply_place,
          state_code: props.row.state_code,
          shipping_address: props.row.shipping_address,
          }}
         >
          
          <Form.Item 
                name={['buyer_num']} 
                label="Customer Mobile"
                rules={[
                  {
                    required: true,
                  },
                ]}
                
              >
                <Input type="number"/>
              </Form.Item>
    
          <Form.Item
            name={['buyer_name']}
            label="Buyer Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
          >
        <Input />
          </Form.Item>
      
          <Form.Item
                name={['gst_number']}
                label="GSTIN"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input/>
              </Form.Item>
              
          <Form.Item
            name={['pan_number']}
            label="PAN"
            rules={[
              {
                required: true,
              },            
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item name={['billing_address']} label="Billing Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={['supply_place']} label="Place of Supply" 
            >
            <Input />
          </Form.Item>
    
          <Form.Item name={['state_code']} label="State Code" 
            >
            <Input/>
          </Form.Item>
    
          <Form.Item name={['shipping_address']} label="Shipping Address">
            <Input />
          </Form.Item>
  
          <Form.Item wrapperCol={{ offset: 22 }}>
          
              <Button type="primary" htmlType="submit">
                Update
              </Button>     
        </Form.Item>
        </Form>
      );
    };
  
  export {CustomerEditForm};