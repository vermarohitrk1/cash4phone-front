import React from 'react';
import "./ProductDetail.css";
import phoneImage from "./images/apple-iphone-12.jpeg";
// import { ProductData } from './Data/ProductData';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { getPhones } from '../../api/api';


export default function ProductDetail({ productId }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`${getPhones}/${productId}`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])
    const [quantity, setQuantity] = useState('select');
    const [color, setColor] = useState('select');
    const [internalStorage, setInternalStorgae] = useState('select');

    const history = useHistory();
  
    const routeChange = (productId) =>{ 
        let path = `/checkout/${productId}`; 
        history.push(path);
    }

    function handleQuantityClick(e) {
        console.log('quantity', e.key);
        setQuantity(e.key);
    }

    function handleColorClick(e) {
        console.log('color', e.key);
        setColor(e.key);
    }

    function handleInternalStorageClick(e) {
        console.log('internalStorage', e.key + 'GB');
        setInternalStorgae(e.key);
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
      
    const internalStorageMenu = (
        <Menu onClick={handleInternalStorageClick} selectedKeys={1} defaultSelectedKeys={"1"}>
        <Menu.Item key="128">
            128GB
        </Menu.Item>
        <Menu.Item key="256">
            256GB
        </Menu.Item>
        <Menu.Item key="512">
            512GB
        </Menu.Item>
        </Menu>
    );
      
    const colorMenu = (
        <Menu onClick={handleColorClick} selectedKeys={1} defaultSelectedKeys={"1"}>
        <Menu.Item key="black">
            Black
        </Menu.Item>
        <Menu.Item key="blue">
            Blue
        </Menu.Item>
        <Menu.Item key="green">
            Green
        </Menu.Item>
        <Menu.Item key="white">
            White
        </Menu.Item>
        </Menu>
    );
      
    return (
        <div className='mainContainer'>
            <div className="productPreview">
                <img src={phoneImage} alt="product preview" />
            </div>
            <div className="productData">
                <h1 className='productTitle'>{product.model}</h1>
                <h3 className="productPrice">₹​ {product.marked_price}</h3>
                {/* <p className="productDescription">{product.color}</p> */}
                <h3 className='productCategory'>Category :- Mobile Phones</h3>

                <Space wrap direction="vertical">
                    <div className="productQuantity" className='choice'>
                        <h3 >Quantity :- </h3>
                        {/* <Dropdown overlay={quantityMenu}> */}
                            <Button>
                            {1} <DownOutlined />
                            </Button>
                        {/* </Dropdown> */}
                    </div>

                    <div className="choice">
                        <h3 className="productColor">Color :- </h3>
                        {/* <Dropdown overlay={colorMenu}> */}
                            <Button>
                                {product.color} 
                            </Button>
                        {/* </Dropdown> */}
                    </div>
                    <div className="choice">
                        <h3 className="productStorage">Storage :- </h3>
                        {/* <Dropdown overlay={internalStorageMenu}> */}
                            <Button>
                            {/* {product.internal_storage} <DownOutlined /> */}
                            {product.internal_storage}
                            </Button>
                        {/* </Dropdown> */}
                    </div>
                    
                    <h3 className="productAvailability">In stock :- Variant available</h3>
                    <div className="choice">
                        {/* <Button type="primary" style={{ background: "#f58936", borderColor: "red", width: "100px" }}>
                            Add to Cart
                        </Button> */}
                        {/* <Button type="primary" style={{ background: "#f58936", borderColor: "red", width: "100px" }}>
                            Buy Now
                        </Button> */}
                        <Link to={`/checkout/${productId}`}><Button type="primary" style={{ background: "#f58936", borderColor: "red", width: "100px" }}>
                            Buy Now
                        </Button></Link>
                    </div>
                    
                </Space>

            </div>
        {/* <div className="similarProduct">
            <h1>here will come more like above product</h1>
        </div> */}
        </div>
    )
}
