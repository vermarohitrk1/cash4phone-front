import React from 'react';
import "./Footer.css";
import Logo from './components/Logo/Logo';
import Links from './components/Links/Links';
function Footer() {
    return (
        <div className="mainComponent">
        {/* <hr /> */}
            <div className="footer">
                <Logo />
                <Links header={"Quick Links"} ql={true} />
                <Links header={"Terms & Conditions"} tnc={true}/>
                <Links header={"Contact Us"} cu={true}/>
            </div>
        </div>
        
    )
}

export default Footer
