import React, { Component, Fragment } from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Quote from "./reports/Quote";

function QuoteList({quote}) {
    console.log('this'+quote)
    const invoice = {
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
        ]
    }
    return (
        <Fragment>
            <PDFViewer width="1200" height="700" className="salesInvoice" >
                <Quote quote={quote}/>
            </PDFViewer>
        </Fragment>
    )
}

export default QuoteList;