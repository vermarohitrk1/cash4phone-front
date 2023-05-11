import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from "./components/Products/pages/Home";
import "./HomePage.css";
import axios from 'axios';
import { getPhones } from './api/api';

export default function HomePage(props) {
    const [products, setProducts] = useState();
    
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        axios.get(getPhones)
        .then((res) => {
            setProducts(res.data); 
        })
    }

    return (
        <div>
            <Header />
            <Home phones={products}/>
            <Footer />
        </div>
    )
}
