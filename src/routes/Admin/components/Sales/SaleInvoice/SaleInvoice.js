import React, { Component, Fragment } from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from "./reports/Invoice";
import './SalesInvoice.css';

function SaleInvoice({location}) {
    let sale = location.state.invoice;

    const invoice = {
        "invoice_number": sale.invoice_number,
        "sale_date": sale.sale_date.slice(0,10),
        "buyer_num": sale.buyer_num, // in address
        "buyer_name": sale.buyer_name, //  in address
        "payment_cash": sale.payment_cash,
        "payment_transfer": sale.payment_transfer,
        "payment_card": sale.payment_card,
        "gst_number": sale.gst_number,
        "pan_number": sale.pan_number,
        "payment_ref_num": sale.payment_ref_num,
        "selling_amount": sale.selling_amount,
        "gst_amt": sale.gst_amt,
        "billing_address": sale.billing_address, // In Address
        "shipping_Address": sale.shipping_address, // In Address
        "supply_place": sale.supply_place,
        "state_code": sale.state_code,
        "payment_words": sale.payment_words,
        "discount": sale.discount,
        "total_margin": sale.total_margin,
        "hsn": 8517,
    
        "cashforphone" : [
          {
            "name": "KNOVEDAD PRIVATE LTD",
            "cin": "U74999DL2018PTC330914",
            "gstin": "07AAHCK0065B1Z0",
            "state_code": "07",
            "corporate_address": "Corporate Address",
            "registered_address": "K22 basement, lajpat nagar, near vijay sales Pincode 110024",
            "website": "www.cashforphone.in",
            "email": "info@cashforphone.in",
            "phone": "8800880101"
          }
        ],
        "items": location.state.phones
    }
    return (
        <Fragment>
            <PDFViewer width="1200" height="700" className="salesInvoice" >
                <Invoice invoice={invoice}/>
            </PDFViewer>
        </Fragment>
    )
}

export default SaleInvoice;