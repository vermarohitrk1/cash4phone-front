import React, { useEffect, useState } from 'react';
import { user } from '../../api/api';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function UserDetail() {
    const userId = cookies.get('userIdToken');
    console.log("user id from cookie in Userdetail is ", userId);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
      axios.post(user, {
          userId: userId
      })
      .then((res) => {
          console.log("response in UserDetails", res.data[0]);
          setName(res.data[0].name);
          setEmail(res.data[0].email);
          setPhone(res.data[0].phone);
      })
    }, []);
    

  return <div>
    <h1>USER DETAILS</h1>
    <h2>NAME :- {name}</h2>
    <h2>Email :- {email}</h2>
    <h2>Phone :- {phone}</h2>
  </div>;
}
