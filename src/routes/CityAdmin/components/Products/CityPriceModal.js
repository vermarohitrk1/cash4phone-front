import React from 'react';
import { Modal, Form, Input, Button  } from 'antd';
import axios from 'axios';
import { cityAdmin } from '../../api/api';

const layout = {
  labelCol: {
    span: 6,
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

const CityPriceModal = (props) => {

  const onFinish = (formValues) => {

    axios.patch(cityAdmin, { price: formValues.price, id: props.value.id, cityName: props.cityName })
      .then((res) => {
          props.setopenModal(false);
          window.location.reload();
      });

  }
  return (
    <>
      <Modal
        title={props.title}
        centered
        visible={props.openModal}
        onOk={(value) => props.setopenModal(false)}
        onCancel={(value) => props.setopenModal(false)}
        width={600}
        footer={null}
      >
       
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">

          <Form.Item
            name={['price']}
            label="Enter New Amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 19 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default CityPriceModal;