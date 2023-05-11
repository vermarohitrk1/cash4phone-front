import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

export default function Payment() {
    const [hash, sethash] = useState('');
    const txnid = 'PQI6MqpYrjEefU' + Math.floor(Math.random() * 1000).toString();
    const pd = {
        key: 'gtKFFx', 
        txnid: txnid /*** Unique Transaction ID***/,
        amount: 100 /*** Amount to be paid ***/,
        firstname: 'User First Name'/*** Name of the User ***/,
        email: 'test@gmail.com'/** Email Id of User **/,
        phone: '9999999999'/** Mobile number of User **/,
        productinfo: 'Apple Iphone 12',
        surl: 'http://localhost:5000/payment/success' /* Success callback URL */,
        furl: 'http://localhost:5000/payment/fail' /* Failure callback URL */,
        service_provider: " "
   }
   
   function redirectToPayU(pd) {
    //use window.bolt.launch if you face an error in bolt.launch
    window.bolt.launch(pd, {
      responseHandler: function (response) {
      // your payment response Code goes here
      console.log("response in responsehandler is ", response);
    //   axios.post('http://localhost:5000/payment/payumoney/response', response.response)
      fetch('http://localhost:5000/payment/payumoney/response', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(response.response)
      })
      .then(function (a) {
         return a.json(); 
       })
      .then(function (json) {
        console.log(json);
       });
    },
    catchException: function (response) {
        console.log("some error in redirecttopayu -- window.bolt", response);
      // the code you use to handle the integration errors goes here
      // Make any UI changes to convey the error to the user
    }
  });
  }

//   function redirectToPayU(pd){
    
//   }
    const getHash = () => {
        console.log("Payment button got clicked");
        axios.post('http://localhost:5000/payment_gateway/payumoney')
        .then((res) => {
            sethash(res.data.hash);
            
        })
        .then((res) => {
            pd['hash'] = hash;
            redirectToPayU(pd);
            console.log("PD is ", pd);
        })
    }


  return <div>
      <Button onClick={getHash}>Pay Now</Button>
  </div>;
}
