import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Form, FormLabel, FormControl, Button } from 'react-bootstrap'
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
// import { Form, Input, InputNumber, Button } from 'antd';
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// /* eslint-disable no-template-curly-in-string */

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };
/* eslint-enable no-template-curly-in-string */


function SuccessPayment() {

    const [baseURL] = useState('https://test.payu.in/_payment'); 
    const [title] = useState( 'React Js Redirect Checkout');
    const [key, setKey] = useState('gtKFFx');
    const [salt] = useState('eCwWELxi');
    const [txnid, setTxnId] = useState('vinaySinghtxnid1234' + Math.round(Math.random(1000, 5000)* 10000));
    // const [txnid, setTxnId] = useState('vinaySagarSinghtxnid1234');
    const [amount, setAmount] = useState('100'); 
    const [firstname, setFirstName] = useState('User001');
    const [email, setEmail] = useState('test@gmail.com');
    const [phone, setPhone] = useState('9971535107');
    const [productinfo, setProductInfo] = useState('iPhone'); 
    const [surl] = useState('http://localhost:5000/payment/success');
    const [furl] = useState('http://localhost:5000/payment/fail');
    // const [serviceProvider] = useState(' ');
    const [hash, setHash] = useState('');


    const calcHash = (e) => {
        let name = e.target.name; 
        let value = e.target.value;

        if(name === 'key') {
            setKey(value);
        }
        if(name === 'txnid') { 
            setTxnId(value);
        } 

        if(name === 'amount') {
            setAmount (value);
        }

        if(name === 'firstname') {
            setFirstName(value);
        } 
        
        if(name === 'email') { 
            setEmail(value);
        } 
        
        if(name === 'phone') {
            setPhone (value);
        } 
        
        if(name === 'productinfo') {
            setProductInfo(value);
        }
    }

    useEffect (() => {
        // Axios.post('http://localhost: 5000/hash', {key, txnid, amount, productinfo, firstname, email, salt})
        //     .then(res => {
        //         setHash(res.data.hash);
        //     });

        Axios.post('http://localhost:5000/payment_gateway/payumoney', {key, txnid, amount, productinfo, firstname, email, salt})
        .then(res => {
            setHash(res.data.hash);
        });

    }, [key, txnid, amount, productinfo, firstname, email, salt]);
    // }, []);

    const onFinish = (values) => {
        console.log(values);
    };


    return (
    <Container>
        <Form action={baseURL} method="post">
            <Row>
                 <h4>{title}</h4>
            </Row>

            <Row className="pt-sm-2">
             <Form.Label>Key</Form.Label>
             <Form.Control type="text" name="key" value={key} onChange={calcHash}></Form.Control>
            </Row>

            <Row className="pt-sm-2">
            <FormLabel>Txn Id</FormLabel>
            <FormControl type="" name="txnid" value={txnid} onChange={calcHash}></FormControl>
            </Row>

            <Row className="pt-sm-2">
             <FormLabel>Product Info</FormLabel>
            <FormControl type="text" name="productinfo" value={productinfo} onChange={calcHash}></FormControl>
            </Row>

            <Row className="pt-sm-2">
             <FormLabel>Amount</FormLabel> 
            <FormControl type="text" name="amount" value={amount} onChange={calcHash}></FormControl>
            </Row>

            <Row className="pt-sm-2">
            <FormLabel>Email</FormLabel>
            <FormControl type="text" name="email" value={email} onChange={calcHash}></FormControl>
            </Row>

            <Row className="pt-sm-2">
            <FormLabel>First name</FormLabel>
            <FormControl type="text" name="firstname" value={firstname} onChange={calcHash}></FormControl>
            </Row>


            <Row className="pt-sm-2">
             <FormLabel>SURL</FormLabel>
            <FormControl type="text" name="surl" value={surl} readOnly></FormControl>
            </Row>

            <Row className="pt-sm-2">
            <FormLabel>FURL</FormLabel> 
             <FormControl type="text" name="furl" value={furl} readOnly></FormControl> 
            </Row>

            {/* <Row className="pt-sm-2">
            <FormLabel>Phone</FormLabel>
            <FormControl type="text" name="phone" value={phone} onChange={calcHash}></FormControl>
            </Row> */}

            {/* <Row className="pt-sm-2">
             <FormLabel>Service Provider</FormLabel>
            <FormControl type="text" name="service_provider" value={serviceProvider} readOnly></FormControl> 
            </Row> */}

            <Row className="pt-sm-2">
             <FormLabel>Hash</FormLabel>
            {/* <FormControl type="text" name="hash" value={hash} readOnly></FormControl> */}
            <FormControl type="text" name="hash"></FormControl>
            </Row>

            <Row className="pt-sm-2">
             <Button type="submit">Pay</Button>
            </Row>

        </Form>
    </Container>
    )  
}

    

export default SuccessPayment
