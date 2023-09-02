import './../../../style.scss'
import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, message, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentDate, convertNumberToString } from '../../../../../../Helpers/helpers';
import axios from 'axios';
import { sales, GET_customers, sales_update, purchase, stock } from '../../../../api/api';
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

const SalesForm = (props) => {
  const { updateSales } = props;

  const [form] = Form.useForm();
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(0);
  const [URP, setURP] = useState(false);
  const [selectedIMEIs, setSelectedIMEIs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formValues, setFormValues] = useState({
    sale_date: getCurrentDate(),
    buyer_num: '',
    buyer_name: '',
    gst_number: '',
    pan_number: '',
    payment_cash: 0,
    payment_card: 0,
    payment_transfer: 0,
    selling_amount: '',
    discount: 0,
    payment_words: '',
    payment_ref_num: '',
    billing_address: '',
    supply_place: '',
    state_code: '',
    shipping_address: '',
    phones: [],
  });

  const onFinish = (values) => {
    
    setIsSubmitting(true);
    const updatedFormValues = {
      ...formValues,
      ...values,
    };

    axios.post(sales, updatedFormValues).then((res) =>{ 
      // console.log(res.status)
      props.setopenModal(false);
      updateSales();
      message.success('Sale created succesfully.');
      setIsSubmitting(false);
    }).catch((error) => {
      if(error.response && error.response.status === 422 ){
        message.error(error.response.data.error);
        setStep(0);
        setIsSubmitting(false);
      }
    });
    
  };

  const handleCustomerSelect = (value) => {
    if (value === 'add-new') {
      setIsAddingNewCustomer(true);
      form.setFieldsValue({ buyer_num: 'add-new' });
      form.setFieldsValue({ gst_number: 'add-new' });
      form.setFieldsValue({
        buyer_name: '',
        pan_number: '',
        billing_address: '',
        supply_place: '',
        state_code: '',
        shipping_address: '',
      });
    } else {
      // const selected = customers.find((customer) => customer.mobile === value);
      const selected = customers.find(
        (customer) => customer.mobile === value || customer.gstin === value
      );
      // if(selected?.gstin === null || selected?.gstin == ''){
      //   setURP(true);
      // }else{
      //   setURP(false)
      // }

      form.setFieldsValue({
        buyer_num: selected?.mobile || '',
        gst_number: selected?.gstin || 'URP',
        buyer_name: selected?.name || '',
        pan_number: selected?.pan || '',
        billing_address: selected?.billing_address || '',
        supply_place: selected?.supply_place || '',
        state_code: selected?.state_code || '',
        shipping_address: selected?.shipping_address || '',
      });
      setIsAddingNewCustomer(false);
    }
  };

  const handleMobileSelect = (value,name) => {

      const selected = products.find((product) => product.imei_num === value);
      const item_price = selected?.purchase_amount;
      
      const phones = form.getFieldValue('phones');
      const updatedPhones = phones.map((phone, index) => {
        setSelectedIMEIs((prevSelectedIMEIs) => {
          const updatedSelectedIMEIs = { ...prevSelectedIMEIs };
          updatedSelectedIMEIs[name] = value;
          return updatedSelectedIMEIs;
        });
        if (index === name) {
          return { ...phone, selling_price: item_price || '' };
        }
        return phone;
      });
      form.setFieldsValue({ phones: updatedPhones });
      updateItemPrice()
  }
  
  const handleRemovePhone = (name) => {
    const removedIMEI = selectedIMEIs[name];

    setSelectedIMEIs((prevSelectedIMEIs) => {
      const updatedSelectedIMEIs = { ...prevSelectedIMEIs };
      delete updatedSelectedIMEIs[name];
      return updatedSelectedIMEIs;
    });

    const selectOption = document.querySelector(`[value="${removedIMEI}"]`);
    if (selectOption) {
      selectOption.disabled = false;
    }
  };

  const updateItemPrice = () => {
    const phones = form.getFieldValue('phones');
  console.log(phones)
    let totalPrice = 0;
    phones.map((phone, index) => {
        if (phone && phone.selling_price) {
          totalPrice += +phone.selling_price;
        }
    });
    setTotalPrice(totalPrice); 
  };

  const handlePaymentChange = (event) => {
    const paymentAmount = event.target.value;
    const paymentWords = convertNumberToString(paymentAmount);
    
    form.setFieldsValue({
      payment_words: paymentWords || '',
    })
    const isInvalidAmount = paymentAmount < totalPrice;
    form.setFields([
      {
        name: 'selling_amount',
        errors: isInvalidAmount ? ['Total amount is less then total price.'] : [],
      },
    ]);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = async () => {
    // await form.validateFields();
    // setStep((prevStep) => prevStep + 1);
    await form
    .validateFields()
    .then((values) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...values,
      }));
      setStep((prevStep) => prevStep + 1);
    })
    .catch((error) => {
      // Handle validation errors
    });
  };

  useEffect(() => {
    // Fetch customer phones from the API
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(GET_customers);
        const customerData = res.data.map((customer) => customer);
        setCustomers(customerData);
      } catch (error) {
        console.error('Error fetching customer phones:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(stock);
        const products = res.data.map((products) => products);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching customer phones:', error);
      }
    };
    fetchProducts();
    fetchCustomers();
  }, []);

  // useEffect(() => {
  //   // Get the IMEI numbers of all selected phones
  //   const selectedIMEINumbers = Object.values(selectedIMEIs);

  //   // Disable the corresponding options for selected phones
  //   const selectOptions = document.querySelectorAll('select[name$="imei_num"] option');
  //   selectOptions.forEach((option) => {
  //     const { value } = option;
  //     option.disabled = selectedIMEINumbers.includes(value);
  //   });
  // }, [selectedIMEIs]);

  return (
    <Form
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      // autoComplete="off"
      initialValues={formValues}
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
              <Select.Option key="add-new" value="add-new">
                Add New
              </Select.Option>
              {customers.map((customer) => (
                <Select.Option key={customer.mobile} value={customer.mobile}>
                  {customer.mobile}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name={['gst_number']}
            label="Buyer GSTIN"
            rules={[
              {
                required: true,
              },
            ]}
          >
          <Select
              showSearch
              placeholder="Customer GSTIN"
              optionFilterProp="children"
              onChange={handleCustomerSelect}
            >
              <Select.Option key="add-new" value="add-new">
                Add New
              </Select.Option>
              {customers.map((customer) => (
                customer.gstin ? (
                  <Select.Option key={customer.gstin} value={customer.gstin}>
                    {customer.gstin}
                  </Select.Option>
                ) : null
              ))}
              {}
            </Select>
          </Form.Item>

          {isAddingNewCustomer ? (
            <>
              <Form.Item
                name={['new_buyer_num']}
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
              
              <Form.Item
                name={['new_gst_number']}
                label="GSTIN"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              </>
          ) : null}
          {URP ? (
            {/* <>
            <Form.Item
                name={['new_gst_number']}
                label="GSTIN"
              >
                <Input />
              </Form.Item>
            </> */}
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
            <Input type="number" />
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

          {/* Back and Next/Submit buttons */}
          <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
          </Form.Item>
        </>
      )}

      {step === 1 && (
        <>
        
        <Form.List name="phones">
        
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => {
                  return(
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                
                    <Form.Item
                      {...restField}
                      label="IMEI"
                      name={[name, 'imei_num']}
                      fieldKey={[fieldKey, 'imei_num']}
                      rules={[{ required: true, message: 'Missing IMEI' }]}
                    >
                      <Select
                        showSearch
                        placeholder="Select IMEI Number"
                        optionFilterProp="children"
                        onChange={(value) => handleMobileSelect(value, name)}
                        style={{MinWidth: '155px'}}
                        className="select-phone"
                      >
                        {products.map((product) => (
                          <Select.Option 
                          key={product.id} 
                          value={product.imei_num}
                          disabled={Object.values(selectedIMEIs).includes(product.imei_num)}
                          >
                            {product.imei_num}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Selling Price"
                      name={[name, 'selling_price']}
                      fieldKey={[fieldKey, 'selling_price']}
                      rules={[{ required: true, message: 'Missing Selling Price' }]}
                    >
                      <Input placeholder="Selling Price" type="number" onChange={updateItemPrice} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => {
                        remove(name);
                        handleRemovePhone(name);
                        updateItemPrice();
                      }} />
                  </Space>
                  
                )})}

                {totalPrice > 0 && (    
                  <span style={{ marginBottom: '15px', fontSize: '16px'}}>
                    Total amount: {totalPrice}
                  </span>
                )}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Phone
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Back and Next/Submit buttons */}
          <Form.Item wrapperCol={{ offset: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
                <Button className="back-button" type="default" onClick={handleBack}>
                  Back
                </Button>

                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
            </div>
          </Form.Item>
        </>
      )}

      {step === 2 && (
        <>
        <span style={{ marginBottom: '15px', fontSize: '16px'}}>
          Total amount: {totalPrice}
        </span>

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
            name={['selling_amount']}
            label="Total Payment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" onChange={handlePaymentChange}/>
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
            
          {/* Back and Next/Submit buttons */}
          <Form.Item wrapperCol={{ offset: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
                <Button className="back-button" type="default" onClick={handleBack}>
                  Back
                </Button>
                
                <Button type="primary"  htmlType="submit" loading={isSubmitting}>
                  Submit
                </Button>
            </div>
          </Form.Item>

          </>
          )}
</Form>
);
};



const SalesEditForm = (props) => {
  const { updateSales } = props;

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

export {SalesForm, SalesEditForm};