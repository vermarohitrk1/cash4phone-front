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
  const inputRefs = useRef({});

  const [formValues, setFormValues] = useState({
    vendor_name: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_address: '',
    city: '',
    state: '',
    phones: [],
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
        setStep(0);
        setIsSubmitting(false);
      }
    });
    
  };


  const handleMobileSelect = (value,name) => {

      const selected = products.find((product) => product.imei_num === value);
      const item_price = selected?.vendor_price;
      
      const phones = form.getFieldValue('phones');
      const updatedPhones = phones.map((phone, index) => {
        setSelectedIMEIs((prevSelectedIMEIs) => {
          const updatedSelectedIMEIs = { ...prevSelectedIMEIs };
          updatedSelectedIMEIs[name] = value;
          return updatedSelectedIMEIs;
        });
        if (index === name) {
          return { ...phone, vendor_price: item_price || '' };
        }
        return phone;
      });
      form.setFieldsValue({ phones: updatedPhones });
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

  const validateSellingAmount = (rule, value) => {
    const paymentCash = form.getFieldValue('payment_cash') || 0;
    const paymentCard = form.getFieldValue('payment_card') || 0;
    const paymentTransfer = form.getFieldValue('payment_transfer') || 0;
    const discount = form.getFieldValue('discount') || 0;

    const calculatedTotal = parseInt(paymentCash) +  parseInt(paymentCard) +  parseInt(paymentTransfer) +  parseInt(discount);

    if (calculatedTotal !== parseInt(value) || value < totalPrice) {
      return Promise.reject('Total payment must equal the sum of above payments and not less than Total Amount');
    }
    return Promise.resolve();
  };


  const handleSearch = (value, name) => {
    // Check for an exact match in the available options
    const matchingProduct = products.find((product) => product.imei_num === value);

    if (matchingProduct && !Object.values(selectedIMEIs).includes(matchingProduct.imei_num)) {
     handleMobileSelect(matchingProduct.imei_num, name);
      const updatedPhones = form.getFieldValue('phones');
      updatedPhones[name].imei_num = matchingProduct.imei_num;
      updatedPhones.push({ imei_num: '', vendor_price: '' });
      form.setFieldsValue({
        phones: updatedPhones,
      });
      
      setTimeout(() => {
        const lastIndex = updatedPhones.length - 1;
        console.log(lastIndex)
        inputRefs.current[lastIndex]?.focus();
      });
    }
  };

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
        <Col span={12}>
            <Form.Item
            name={['vendor_name']}
            label="Vendor Name"
            >
            <Input />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name={['vendor_phone']}
                label="Vendor Phone"
            >
                <Input type="number"/>
            </Form.Item>
            </Col>
        </Row>
        
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
                  // rules={[{ required: true, message: 'Missing IMEI' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select IMEI Number"
                    optionFilterProp="children"
                    onChange={(value) => handleMobileSelect(value, name)}
                    onSearch={(value) => handleSearch(value, name)}
                    style={{MinWidth: '155px'}}
                    className="select-phone"
                    ref={(ref) => (inputRefs.current[name] = ref)}
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
                  label="Vendor Price"
                  name={[name, 'vendor_price']}
                  fieldKey={[fieldKey, 'vendor_price']}
                  // rules={[{ required: true, message: 'Missing Selling Price' }]}
                >
                  <Input placeholder="Vendore Price" type="number" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => {
                    remove(name);
                    handleRemovePhone(name);
                  }} />
              </Space>
              
            )})}
            <Form.Item>
              <Button type="dashed" onClick={() => { 
                add();
                setTimeout(() => {
                  const lastIndex = fields.length;
                  inputRefs.current[lastIndex]?.focus();
                });
              }} 
              block icon={<PlusOutlined />}>
                Add Phone
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
</Form>
);
};

export {QuoteEditForm};