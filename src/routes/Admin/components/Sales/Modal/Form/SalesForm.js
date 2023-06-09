import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { sales, customers, customer_phones, sales_update } from '../../../../api/api';
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

const SalesForm2 = (props) => {

  
const [selectedCustomer, setSelectedCustomer] = useState('');
const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
const [customers, setCustomers] = useState([]);

const onFinish = (values) => {

    axios.post(sales, values)
      .then((res) => console.log(res));

    props.setopenModal(false);
  };

  const handleCustomerSelect = (value) => {
    if (value === 'add-new') {
      setIsAddingNewCustomer(true);
      setSelectedCustomer(null);
    } else {
      const selected = customers.find((customer) => customer.mobile === value);
      setSelectedCustomer(selected);
      setIsAddingNewCustomer(false);
    }
  };
  useEffect(() => {
    
    // Fetch customer phones from the API
    const fetchCustomerPhones = async () => {
      try {
        axios.get(customer_phones)
        .then((res) => {
          const customer_data = res.data.map((customer) => customer);
          setCustomers(customer_data);
        });
      } catch (error) {
        console.error('Error fetching customer phones:', error);
      }
    };

    fetchCustomerPhones();
  }, []);
  
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
        <Select
          showSearch
          placeholder="Select or Add a customer"
          optionFilterProp="children"
          onChange={handleCustomerSelect}
        >
          {customers.map((customer) => (
            <Select.Option key={customer.mobile} value={customer.mobile}>
              {customer.mobile}
            </Select.Option>
          ))}
          <Select.Option key="add-new" value="add-new">
            Add New
          </Select.Option>
        </Select>
      </Form.Item>

      {isAddingNewCustomer ? (
        <>
          <Form.Item 
            name={['buyer_num']} 
            label="New Customer Mobile"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number"/>
          </Form.Item>
          {/* Render other fields for adding a new customer */}
        </>
      ) : null}

      <Form.Item
        name={['buyer_name']}
        label="Buyer Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
  <Input value={selectedCustomer ? selectedCustomer.name : ''}/>
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


const SalesEditForm = (props) => {

  const isEditable = (created) => {
    const currentTime = new Date();
    const createdTime = new Date(created);
    const timeDifference = currentTime - createdTime;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
    return hoursDifference <= 24;
  };

    const onFinish = (values) => {
      values.invoice_number = props.row.invoice_number_unique;
      if(!values.buyer_num) values.buyer_num = props.row.buyer_num;
      if(!values.buyer_name) values.buyer_name = props.row.buyer_name;
      if(!values.supply_place) values.supply_place = props.row.supply_place;
      if(!values.state_code) values.state_code = props.row.state_code;
      if(!values.shipping_address) values.shipping_address = props.row.shipping_address;

      axios.patch(sales_update, values)
        .then((res) => {
          if(res.status === 200) {
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

  const SalesForm = (props) => {
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [step, setStep] = useState(0);

  const onFinish = (values) => {
    axios.post(sales, values).then((res) => console.log(res));
    props.setopenModal(false);
  };

  const handleCustomerSelect = (value) => {
    if (value === 'add-new') {
      setIsAddingNewCustomer(true);
      setSelectedCustomer(null);
    } else {
      const selected = customers.find((customer) => customer.mobile === value);
      setSelectedCustomer(selected);
      setIsAddingNewCustomer(false);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    // Fetch customer phones from the API
    const fetchCustomerPhones = async () => {
      try {
        const res = await axios.get(customer_phones);
        const customerData = res.data.map((customer) => customer);
        setCustomers(customerData);
      } catch (error) {
        console.error('Error fetching customer phones:', error);
      }
    };

    fetchCustomerPhones();
  }, []);


  return (
    <Form
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      autoComplete="off"
      initialValues={{
        sale_date: '',
        buyer_num: '',
        buyer_name: selectedCustomer ? selectedCustomer.name : '',
        gst_number: '',
        pan_number: '',
        payment_cash: '',
        payment_card: '',
        payment_transfer: '',
        selling_amount: '',
        discount: '',
        payment_words: '',
        payment_ref_num: '',
        billing_address: '',
        supply_place: '',
        state_code: '',
        shipping_address: '',
        phones: [],
      }}
    >
       {step === 0 && (
        <>
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
            <Select
              showSearch
              placeholder="Select or Add a customer"
              optionFilterProp="children"
              onChange={handleCustomerSelect}
            >
              {customers.map((customer) => (
                <Select.Option key={customer.mobile} value={customer.mobile}>
                  {customer.mobile}
                </Select.Option>
              ))}
              <Select.Option key="add-new" value="add-new">
                Add New
              </Select.Option>
            </Select>
          </Form.Item>

          {isAddingNewCustomer ? (
            <>
              <Form.Item
                name={['new_customer_mobile']}
                label="New Customer Mobile"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              {/* Render other fields for adding a new customer */}
            </>
          ) : null}

          <Form.Item
            name={['buyer_name']}
            label="Buyer Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={selectedCustomer ? selectedCustomer.name : ''} />
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
            <Input />
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
        </>
      )}

      {step === 1 && (
        <>
          <Form.Item
            name={['payment_cash']}
            label="Payment Cash"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={['payment_card']}
            label="Payment Card"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={['payment_transfer']}
            label="Payment Transfer"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={['selling_amount']}
            label="Total Payment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={['discount']}
            label="Discount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={['payment_words']}
            label="After Discount Payment(in Words)"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="string" />
          </Form.Item>

          <Form.Item
            name={['payment_ref_num']}
            label="Payment Reference Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
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

        </>
      )}

      {step === 2 && (
        <>
          <Form.Item
            name={['supply_place']}
            label="Place of Supply"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['state_code']}
            label="State Code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['shipping_address']}
            label="Shipping Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label="IMEI"
                      name={[name, 'imei_num']}
                      fieldKey={[        fieldKey, 'imei_num']}
                      rules={[{ required: true, message: 'Missing IMEI' }]}
                    >
                      <Input placeholder="IMEI Number" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Selling Price"
                      name={[name, 'selling_price']}
                      fieldKey={[fieldKey, 'selling_price']}
                      rules={[{ required: true, message: 'Missing Selling Price' }]}
                    >
                      <Input placeholder="Selling Price" type="number" />
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
          </>
          )}

      {/* Back and Next/Submit buttons */}
      <Form.Item wrapperCol={{ offset: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {step > 0 && (
            <Button className="back-button" type="default" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form.Item>

</Form>
);
};

export {SalesForm, SalesEditForm};