import './../../style.scss'
import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Space, Select, Row, Col, message, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentDate, convertNumberToString } from '../../../../../Helpers/helpers';
import axios from 'axios';
import moment from 'moment';
import { formatDate } from '../../../../../Helpers/helpers';
import { quote, updateQuoteItems, stock } from '../../../api/api';
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
  const { phones, updateTable } = props;

  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    
  });

  const onFinish = (values) => {
    
    setIsSubmitting(true);
    // const updatedFormValues = {
    //   ...formValues,
    //   ...values,
    // };
    const convertedPayload = { offer_price: {} };
    Object.keys(values).forEach((key) => {
      const name = key.split('_')[0]+'_'+key.split('_')[1];
      const id = key.split('_')[2];
      const value = values[key];
      convertedPayload['offer_price'][id] = value;
    });
    axios.patch(updateQuoteItems, convertedPayload).then((res) =>{ 
      // console.log(res.status)
      props.setOpenEditModal(false);
      updateTable();
      message.success('Qutoe item updated succesfully.');
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
        <Row gutter={16}>
          <Col span={4} style={{textAlign: 'center'}}>
              <Text>Order Number</Text>
          </Col>
          <Col span={6} style={{textAlign: 'center'}}>
              <Text>Model</Text>
          </Col>
          <Col span={2} style={{textAlign: 'center'}}>
              <Text>Grade</Text>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
              <Text>Warranty Till</Text>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
              <Text>Vendor Price</Text>
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
              <Text>Offer Price</Text>
          </Col>
        </Row>
      {phones.map((phone) => (   
        <Row gutter={16}>
          <Col span={4} style={{textAlign: 'center'}}>
            <Input
              placeholder=""
              defaultValue={phone.order_num} 
              disabled
            />
          </Col>
          <Col span={6} style={{textAlign: 'center'}}>
            <Input
              placeholder=""
              defaultValue={phone.model} 
              disabled
            />
          </Col>
          <Col span={2} style={{textAlign: 'center'}}>
            <Input
              placeholder=""
              defaultValue={phone.overall_condition} 
              disabled
            />
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <Input
              placeholder=""
              defaultValue={formatDate(phone.warranty_till, 'YYYY-MM-DD')} 
              disabled
            />
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <Input
              placeholder=""
              defaultValue={phone.vendor_price} 
              disabled
            />
          </Col>
          <Col span={4} style={{textAlign: 'center'}}>
            <Form.Item
              key={phone.id}
              name={['offer_price_'+phone.id]}
              initialValue={phone.offer_price} 
            >
              <Input
                placeholder="Enter Offer Price"
              />
            </Form.Item>
          </Col>
        </Row>
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