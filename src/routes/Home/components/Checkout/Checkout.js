import React from 'react';
import Header from '../Header/Header';
import CheckoutBody from './CheckoutBody';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

export default function Checkout() {
  const { productId } = useParams();
  console.log("Product id received in checkout.js is ", productId);
  return (
      <div>
          <Header />
          <CheckoutBody productId={productId}/>
          <Footer />
      </div>
  )
}
