import React from 'react';
import { Button } from 'antd';
import './Logo.css';

export default function Logo() {
    return (
        <div className='logo'>
            <a href="https://buy.cashforphone.in/">
                <img className="footer-logo-img"  src="https://cashforphone.in/assets/images/cfp-logo.png" alt="logo" />
            </a>
            <p className="footer-about">Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since
            the 1500s,
            </p>
           <Button type="primary" style={{ background: "#f58936", borderColor: "red", width: "100px" }}>
                Read More
            </Button>
        </div>
    )
}
