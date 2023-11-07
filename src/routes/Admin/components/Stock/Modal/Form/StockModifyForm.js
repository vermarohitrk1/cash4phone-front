import { Form, Input, Button, Radio, Checkbox, Select, Row, Col, message } from 'antd';
import axios from 'axios';

import { purchase, deleteNotification } from '../../../../api/api';
import { formatDate } from '../../../../../../Helpers/helpers';

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

const faulty_options = [
  {label: "Display/Touchpad Issue/Discoloration", value: "A"},
  {label: "Screen Glass Broken", value: "B"},
  {label: "Front Camera Not Working Or Faulty", value: "C"},
  {label: "Volume Button Defect", value: "D"},
  {label: "Wifi/GPS Not Working", value: "E"},
  {label: "Power/Home Button Faulty; Hard or Not Working", value: "F"},
  {label: "Charging Defect", value: "G"}
];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const StockModifyForm = (props) => {
  const {updateTable} = props;
  const onFinish = (values) => {
    values.order_num = props.row.order_num;
    values.purchase_date = props.row.purchase_date;
    if(!values.mobile_num) values.mobile_num = props.row.mobile_num;
    if(!values.seller_name) values.seller_name = props.row.seller_name;
    if(!values.purchase_amount) values.purchase_amount = props.row.purchase_amount;
    if(!values.payment_mode) values.payment_mode = props.row.payment_mode;
    if(!values.imei_num) values.imei_num = props.row.imei_num;
    if(!values.brand) values.brand = props.row.brand;
    if(!values.model) values.model = props.row.model;
    if(!values.box) values.box = props.row.box;
    if(!values.charger) values.charger = props.row.charger;
    if(!values.earphone) values.earphone = props.row.earphone;
    if(!values.overall_condition) values.overall_condition = props.row.overall_condition;
    if(!values.picked_by) values.picked_by = props.row.picked_by;
    if(!values.purchase_price) values.purchase_price = props.row.purchase_price;
    if(!values.phone_color) values.phone_color = props.row.phone_color;
    if(!values.warranty_till) values.warranty_till = props.row.warranty_till;
    if(!values.grade) values.grade = props.row.grade;
    if(!values.faults) values.faults = props.row.faults;
    if(!values.vendor_price) values.vendor_price = props.row.vendor_price;
    if(!values.retail_price) values.retail_price = props.row.retail_price;
    
    axios.patch(purchase, values)
      .then((res) => {
        if(res.status === 200) {
          message.success('Entry Modified successfully');
          updateTable()
          axios.post(deleteNotification, {
            action: "MOD",
            order_num: props.row.order_num
          }).then((res) => console.log(res));
        }
      });
      
    
    props.setOpenModifyModal(false);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">

      {/* <Form.Item
        name={['order_num']}
        label="Order Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type='number' defaultValue={props.row.order_num} />
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
        <Input type='date' defaultValue={props.row.purchase_date} />
      </Form.Item> */}

      <Row gutter={16}>
        <Col span={12}>
        <Form.Item
          name={['mobile_num']}
          label="Seller Phone No"
        >
          <Input defaultValue={props.row.mobile_num} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={['seller_name']}
          label="Seller Name"
        >
          <Input defaultValue={props.row.seller_name} />
        </Form.Item>
      </Col>
    </Row>
    
      <Row gutter={16}>
        <Col span={12}>
        <Form.Item name={['picked_by']} label="Picked by">
          <Input defaultValue={props.row.picked_by} />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          name={['purchase_amount']}
          label="Purchase Amount"
        >
          <Input defaultValue={props.row.purchase_amount} />
        </Form.Item>
        </Col>
      </Row>
        
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['payment_mode']} label="Payment Mode">
            <Input defaultValue={props.row.payment_mode} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['imei_num']}
            label="IMEI Number"
          >
            <Input defaultValue={props.row.imei_num} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['brand']} label="Phone Brand">
            <Input defaultValue={props.row.brand} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['model']} label="Phone Model">
            <Input defaultValue={props.row.model} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name={['phone_color']}
          label="Phone Color"
        >
          <Input defaultValue={props.row.phone_color} />
        </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['warranty_till']}
            label="Warranty Till" 
            initialValue={'20-01-2011'}
          >
          {/* defaultValue={formatDate(props.row.warranty_till,'YYYY-MM-DD')} */}
            <Input type='date' />
          </Form.Item>
        </Col> 
    </Row>
    
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name={['grade']}
          label="Grade"
        >
          <Input defaultValue={props.row.grade} />
        </Form.Item>
        </Col>
    </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['box']} label="Box">
              <Radio.Group defaultValue={props.row.box.toString()}>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Radio.Group>
          </Form.Item>

          <Form.Item name={['charger']} label="Charger">
              <Radio.Group defaultValue={props.row.charger.toString()}>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Radio.Group>
          </Form.Item>

          <Form.Item name={['earphone']} label="Earphone">
              <Radio.Group defaultValue={props.row.earphone.toString()}>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['faults']} label="Faulty if any" initialValue={props.row.faulty_if_any?.slice(1, -1).split(",").map(item => item.trim())}>
            <Checkbox.Group options={faulty_options}  />
          </Form.Item>
        </Col>
    </Row>

      <Row gutter={16}>
      <Col span={12}>
        <Form.Item name={['overall_condition']} label="Overall Condition">
            <Radio.Group defaultValue={props.row.overall_condition}>
              <Radio value="A">A</Radio>
              <Radio value="B">B</Radio>
              <Radio value="C">C</Radio>
              <Radio value="D">D</Radio>
            </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={12}>
          <Form.Item
            name={['purchase_price']}
            label="Purchase Price"
          >
            <Input defaultValue={props.row.purchase_price} />
          </Form.Item>
      </Col>
    </Row>
      
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name={['vendor_price']}
          label="Vendor Price"
        >
          <Input defaultValue={props.row.vendor_price} />
        </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['retail_price']}
            label="Retail Price"
          >
            <Input defaultValue={props.row.retail_price} />
          </Form.Item>
        </Col>
    </Row>
    

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default StockModifyForm;