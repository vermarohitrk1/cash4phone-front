import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { sales } from '../../../../api/api';

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




const SalesForm = (props) => {

  const onFinish = (values) => {

    axios.post(sales, values)
      .then((res) => console.log(res));

    props.setopenModal(false);
  };


  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">
      <Form.Item
        name={['sale_date']}
        label="Sale Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="date" />
      </Form.Item>

      

      <Form.Item
        name={['buyer_num']}
        label="Buyer Number"
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

      <Form.Item name={['gst_number']} label="GSTIN" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name={['pan_number']} label="PAN" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name={['payment_cash']} label="Payment Cash" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="number"/>
      </Form.Item>

      <Form.Item name={['payment_card']} label="Payment Card" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="number"/>
      </Form.Item>

      <Form.Item name={['payment_transfer']} label="Payment Transfer" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="number"/>
      </Form.Item>

      <Form.Item name={['selling_amount']} label="Total Payment" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="number"/>
      </Form.Item>

      <Form.Item name={['discount']} label="Discount" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="number"/>
      </Form.Item>

      <Form.Item name={['payment_words']} label="After Discount Payment(in Words)" rules={[
          {
            required: true,
          },
        ]}>
        <Input type="string"/>
      </Form.Item>

      <Form.Item name={['payment_ref_num']} label="Payment Reference Number" rules={[
          {
            required: true,
          },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item
        name={['billing_address']}
        label="Billing Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['supply_place']} label="Place of Supply" 
        rules={[
          {
            required: true,
          },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item name={['state_code']} label="State Code" 
        rules={[
          {
            required: true,
          },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item name={['shipping_address']} label="Shipping Address" rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>

      {/* <Form.Item
        name={['total_amount']}
        label="Total Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}

      <Form.List name="phones">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  label="IMEI"
                  name={[name, 'imei_num']}
                  fieldKey={[fieldKey, 'imei_num']}
                  rules={[{ required: true, message: 'Missing IMEI' }]}
                >
                  <Input placeholder="IMEI Number"/>
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Selling Price"
                  name={[name, 'selling_price']}
                  fieldKey={[fieldKey, 'selling_price']}
                  rules={[{ required: true, message: 'Missing Selling Price' }]}
                >
                  <Input placeholder="Seling Price" type="number"/>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Phone
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>


      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      
    </Form>
  );
};

export default SalesForm;