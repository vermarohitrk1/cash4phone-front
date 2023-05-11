import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import "./Links.css"

export default function Links({ header, tnc, ql, cu }) {
    return (
        <div>
            <h2 className='header'>{header}</h2>
            {ql && <ul>
                <li>Home</li>
                <li>Reburbished Phone</li>
                <li>Refurbished ram</li>
                <li>Repair</li>
                <li>Cable & Chargers</li>
                <li>Contact</li>
            </ul>}

            {tnc && <ul>
                <li>Privacy Policy</li>
                <li>Term & Condition</li>
                <li>Refund & Request</li>
            </ul>}

            {
                cu && <ul>
                    <li> <LocationOnIcon /> DD 35 , Kalkaji (Near Kalkaji Post offce) New Delhi - 110048</li>
                    <li> <PhoneIcon /> 8800880101</li>
                    <li> <EmailIcon /> info@cashforphone.in</li>
                </ul>
            }
            
        </div>
    )
}
