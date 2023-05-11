import React from 'react';
import { useParams } from 'react-router-dom'
import Header from '../Header/Header';
import ProductDetail from './ProductDetail';
import Footer from '../Footer/Footer';
// import CheckoutBody from '../Checkout/CheckoutBody';
// import Checkout from '../Checkout/Checkout';

export default function SingleProduct(props) {
    const { productId } = useParams();
    // const productId = props.match.params.productId
    console.log("useParams received in single product", productId);
    // const location = useLocation()
    // const productData = location.state;
    // console.log("Location.state received is ", location.state);
    // const { state } = props.location;
    // console.log("data received in singleProduct page is ", state);
    return (
        <div>
            <Header />
            <ProductDetail productId={productId} />
            <Footer />
            {/* <Checkout /> */}
        </div>
    )
}
