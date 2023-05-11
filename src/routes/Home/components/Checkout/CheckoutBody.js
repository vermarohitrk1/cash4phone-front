import React from 'react';
import "./CheckoutBody.css";
import { Menu, Button, Form, Input, Card, Space, Result  } from 'antd';
import { DownOutlined, AudioOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import phoneImage from '../Products/constants/phones/apple-iphone-12.jpeg';
import { postOrder, getPhones } from '../../api/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);



const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: 'This Input is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const checkout = {
    title: "Shipping Address",
    price: 100,
    description: "some description"
}

const phone = {
    title: "Apple Iphone 12",
    color: 'Black',
    ram: '4GB',
    internalStorage: '128GB',
    price: '12500',
    shippingCharges: '0'
}


export default function CheckoutBody({ productId }) {

    const userId = cookies.get('userIdToken');

    const [quantity, setQuantity] = useState('select');
    const [product, setProduct] = useState([]);
    const [address, setAdress] = useState();
    const [showOrderPreview, setShowOrderPreview] = useState(true);
    const [showAddress, setShowAddress] = useState(true);
    const [showAddressCard, setShowAddressCard] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [successMessage, setSucessMessage] = useState("Congrats, your order has been placed successfully and will reach to you shortly.")

    useEffect(() => {
        axios.get(`${getPhones}/${productId}`)
            .then(response => {
                // console.log("checkoutbody get /phones/product/number is ", response.data[0]);
                setProduct(response.data[0])
            })

    }, [])

    function handleQuantityClick(e) {
        console.log('quantity', e.key);
        setQuantity(e.key);
    }

    const quantityMenu = (
        <Menu onClick={handleQuantityClick} selectedKeys={1} defaultSelectedKeys={"1"}>
            <Menu.Item key="1">
            1
            </Menu.Item>
            <Menu.Item key="2">
            2
            </Menu.Item>
            <Menu.Item key="3">
            3
            </Menu.Item>
        </Menu>
    );

    const onFinish = (values) => {
        setAdress(values);
        setShowAddress(false);
        setShowAddressCard(true);

        console.log(address);

    };

    const handleChangeAddress = () => {
        setShowAddress(true);
        setShowAddressCard(false);
    }

    const completeOrderButton = () => {
        // axios.post('http://localhost:6000/payment_gateway/payumoney')
        //     .then(res => console.log("Payment response is ", res))

        axios.post(postOrder, {
            productId: productId,
            price_paid: product.marked_price,
            payment_mode: 'Cash On Delivery',
            address: address,
            userId: userId
        })
        .then((res) => {
            setSucessMessage(res.data.message);
            setShowOrderPreview(false);
            setShowAddress(false);
            setShowAddressCard(false);
            setShowPaymentSuccess(true);
            console.log(res);
        })
    }
    
      
    return (
        <div className='mainContainer'>
         {showPaymentSuccess && <div className="orderComplete">
         <Result
                status="success"
                title="Successfully Placed Order "
                subTitle={successMessage}
                extra={[
                <Button href='https://buy.cashforphone.in/' type="primary" key="console">
                    Go to Home
                </Button>,
                <Button key="buy">Buy Again</Button>,
                ]}
            />
         </div>}
         {showOrderPreview && <div className="orderPreview">
                <div>
                <div className="container1">
                    <div className="phoneImage">
                        <img src={phoneImage} alt="product preview" />
                    </div>
                    <div className="phoneInfo">
                        <p>{product.model}</p>
                        <p>{product.color}</p>
                        <p>{product.ram}</p>
                        <p>{product.internal_storage}</p>
                    </div>
                </div>
                <hr />
                <Form {...layout} autoComplete='off' style={{margin: '8px 8px'}}>
                    <Form.Item
                        name={['discount']}
                        style={{ display: 'inline-block', width: 'calc(80% - 0px)', margin: '5px 0px' }}
                    >
                        <Input placeholder='Gift Card or Discount Code'/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }} style={{ display: 'inline-block', width: 'calc(20% - 10px)', margin: '5px 0px' }}>
                        <Button type="primary" htmlType="submit" style={{ background: "#f58936", borderColor: "red" }}>
                        Apply
                        </Button>
                    </Form.Item>
                </Form>
                <hr />
                <div className="total">
                    <div className="phonePrice" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Subtotal: </p>
                        <p>{product.marked_price}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Shipping Charges: </p>
                        <p>{phone.shippingCharges}</p>
                    </div>
                    <hr />
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '10px'}}>
                        <p>Total: </p>
                        <p>{parseInt(product.marked_price) + parseInt(phone.shippingCharges)}</p>
                    </div>
                </div>
                </div>
                
            </div>}
            {showOrderPreview && <div className="addressPreview">
                { showAddress && <div>
                <h1 className='productTitle'>{checkout.title}</h1>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off">

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item
                            name={['first_name']}
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input placeholder='First Name'/>
                        </Form.Item>
                        <Form.Item
                            name={['last_name']}
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 5px' }}
                        >
                            <Input placeholder='Last Name'/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        name={['address']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Full Address'/>
                    </Form.Item>
                    
                    <Form.Item
                        name={['apartment']}
                    >
                        <Input placeholder='Apartment, Suite, etc. (Optional)'/>
                    </Form.Item>
                    
                    <Form.Item
                        name={['company']}
                    >
                        <Input placeholder='Company(Optional)'/>
                    </Form.Item>
                    
                    <Form.Item
                        name={['city']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='City'/>
                    </Form.Item>

                    <Form.Item
                        name={['country']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Country'/>
                    </Form.Item>

                    <Form.Item
                        name={['state']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='State'/>
                    </Form.Item>

                    <Form.Item
                        name={['pincode']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Pincode'/>
                    </Form.Item>

                    <Form.Item
                        name={['phone_number']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Phone Number'/>
                    </Form.Item>

                    <Form.Item
                        name={['email']}
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='Email'/>
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                        <Button type="primary" htmlType="submit" style={{ background: "#f58936", borderColor: "red" }}>
                        Continue to Payment
                        </Button>
                    </Form.Item>

                </Form>
                </div>}
                {showAddressCard && <div>
                    <Card size="small" title="Ship To" extra={<a onClick={handleChangeAddress}>change</a>} style={{ width: 300 }}>
                        <p>{address.address}</p>
                    </Card>
                    <div className='paymentCard' >
                        <h2>Payment</h2>
                        <p>All Transactions are secure and encrypted.</p>
                    </div>

                    <Card size="small" title="On Call Payment" style={{ width: 300 }}>
                        {/* <p>After Clicking "Complete Order", you will be redirected to PayU (Cards, NetBanking, Wallets)
                            to complete your purchase securely.</p> */}
                        <p>After Clicking "Complete Order", your order will be transferred to our Payment team and our agent will call you
                         for further Payment Processing. After completion of Payment your order will be placed.</p>
                    </Card>
                    <Button onClick={completeOrderButton} type="primary" style={{ background: "#f58936", borderColor: "red", marginTop: "10px" }}>Complete Order</Button>
                </div>}
                
            </div>}
        </div>
    )
}
