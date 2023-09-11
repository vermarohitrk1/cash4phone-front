import './../../../style.scss'
import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentDate, convertNumberToString } from '../../../../../../Helpers/helpers';
import axios from 'axios';
import { sales, GET_customers, sales_update, purchase, stock } from '../../../../api/api';
const { Text } = Typography;


const customerEditForm = (props) => {
    const { updateCustomerRow } = props;
  
       const onFinish = (values) => {
  
        values.invoice_number = props.row.invoice_number_unique;
        axios.patch(customer_update, values)
          .then((res) => {
            if(res.status === 200) {
              updateSales()
              message.success('Entry Modified successfully');
            }
            props.setOpenModal(false);
          });
      };
    
      return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">
          
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
  
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
          {isEditable(props.row.createTime) ? (
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          ) : (
            <>
              <Button type="primary" htmlType="submit" disabled>
                Update
              </Button>
              <Text className="error-message" type="warning">Immutable</Text>
            </>
          )}
        </Form.Item>
        </Form>
      );
    };
  
  export {customerEditForm};