import './../../style.scss'
import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Space, Select, Row, Col, message, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentDate, convertNumberToString } from '../../../../../Helpers/helpers';
import axios from 'axios';
import { quote, GET_customers, stock } from '../../../api/api';
const { Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

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

const QuoteEditForm = (props) => {
  const { phones, updateSales } = props;

  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    vendor_name: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_address: '',
    city: '',
    state: '',
  });

  const onFinish = (values) => {
    
    setIsSubmitting(true);
    const updatedFormValues = {
      ...formValues,
      ...values,
    };

    axios.post(quote, updatedFormValues).then((res) =>{ 
      // console.log(res.status)
      props.setopenModal(false);
      updateSales();
      message.success('Qutoe created succesfully.');
      setIsSubmitting(false);
    }).catch((error) => {
      if(error.response && error.response.status === 422 ){
        message.error(error.response.data.error);
        setIsSubmitting(false);
      }
    });
    
  };

  useEffect(() => {
      try {
        const res = axios.get(stock);
        const products = res.data.map((products) => products);
        console.log(products)
        setProducts(products);
      } catch (error) {
        console.error('Error fetching customer phones:', error);
      }
  }, []);

  return (
    <Form
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      // autoComplete="off"
      initialValues={formValues}
    >
              
      {phones.map((phone) => (   
        <Form.Item
          key={phone.purchase_id}
          label={phone.model}
          name={['products', phone.purchase_id, 'price']}
          initialValue={phone.vendore_price} 
        >
          <Input
            placeholder="Enter Offer Price"
            style={{ width: '200px' }}
          />
        </Form.Item>
      ))}
    
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
    </Form.Item>
</Form>
);
};

export {QuoteEditForm};