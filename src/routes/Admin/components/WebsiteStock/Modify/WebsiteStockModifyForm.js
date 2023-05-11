import { Form, Input, Button, Radio, message } from 'antd';
import axios from 'axios';

import { product as patchProduct } from '../../../api/api';

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


const WebsiteStockModifyForm = (props) => {
  console.log("props received in websiteStockModifyForm is ", props);
  const onFinish = (values) => {
    
    // console.log("Values are ", values);
    
    axios.patch(patchProduct, values)
      .then((res) => {
        if(res.status === 200) {
          message.success('Entry Modified successfully');
          
          // axios.post(deleteNotification, {
          //   action: "MOD",
          //   order_num: props.row.order_num
          // }).then((res) => console.log(res));
        }
      });
    
    props.setOpenModifyModal(false);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={props.row} validateMessages={validateMessages} autoComplete="off">

      <Form.Item
        name={['id']}
        label="Id"
      >
        <Input disabled /> 
      </Form.Item>

      <Form.Item
        name={['brand']}
        label="Brand"
      >
        <Input /> 
      </Form.Item>

      <Form.Item
        name={['model']}
        label="Model"
      >
        <Input /> 
      </Form.Item>

      <Form.Item
        name={['color']}
        label="Color"
      >
        <Input /> 
      </Form.Item>

      <Form.Item name={['marked_price']} label="Marked Price">
        <Input /> 
      </Form.Item>

      <Form.Item
        name={['ram']}
        label="RAM"
      >
        <Input /> 
      </Form.Item>

      <Form.Item name={['internal_storage']} label="Internal Storage">
        <Input /> 
      </Form.Item>

      <Form.Item name={['discount']} label="Discount">
        <Input /> 
      </Form.Item>

      <Form.Item name={['imei_num']} label="IMEI Number">
        <Input /> 
      </Form.Item>

      <Form.Item name={['box']} label="Box" rules={[
          {
            required: true,
          },
        ]}>
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="0">No</Radio>
          </Radio.Group>
      </Form.Item>

      <Form.Item name={['charger']} label="Charger" rules={[
          {
            required: true,
          },
        ]}>
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="0">No</Radio>
          </Radio.Group>
      </Form.Item>

      <Form.Item name={['earphone']} label="Earphone" rules={[
          {
            required: true,
          },
        ]}>
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="0">No</Radio>
          </Radio.Group>
      </Form.Item>

      <Form.Item name={['refurbished_status']} label="Refurbished Status" rules={[
          {
            required: true,
          },
        ]}>
          <Radio.Group>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
            <Radio value="D">D</Radio>
          </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default WebsiteStockModifyForm;