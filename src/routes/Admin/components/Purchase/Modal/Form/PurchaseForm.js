import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

import { purchase } from '../../../../api/api';

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


const PurchaseForm = (props) => {
  const {updateTable} = props;

  const onFinish = (values) => {
    axios.post(purchase, values)
      .then((res) => {
        console.log(typeof updateTable)
        updateTable();
        console.log(res)
      });
    props.setopenModal(false);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">

      <Form.Item
        name={['order_num']}
        label="Order Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type='number' />
      </Form.Item>

      <Form.Item
        name={['purchase_date']}
        label="Date"
        rules={[
          {
            type: 'date',
            required: true,
          },
        ]}
      >
        <Input type='date'/>
      </Form.Item>

      <Form.Item
        name={['mobile_num']}
        label="Seller Phone No"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type='number'/>
      </Form.Item>

      <Form.Item
        name={['seller_name']}
        label="Seller Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['purchase_amount']}
        label="Purchase Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['payment_mode']} label="Payment Mode" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name={['imei_num']}
        label="IMEI Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['brand']} label="Phone Brand" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name={['model']} label="Phone Model" rules={[
          {
            required: true,
          },
        ]}>
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

      <Form.Item name={['picked_by']} label="Picked by" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name={['overall_condition']} label="Overall Condition" rules={[
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

      <Form.Item
        name={['purchase_price']}
        label="Purchase Price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default PurchaseForm;