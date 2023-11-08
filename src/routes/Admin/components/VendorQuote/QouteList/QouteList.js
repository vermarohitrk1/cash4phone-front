import React, { Component, Fragment } from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Quote from "./reports/Quote";

const faulty_options = [
    {A: "Display/Touchpad Issue/Discoloration"},
    {B: "Screen Glass Broken"},
    {C: "Front Camera Not Working Or Faulty"},
    {D: "Volume Button Defect"},
    {E: "Wifi/GPS Not Working"},
    {F: "Power/Home Button Faulty; Hard or Not Working"},
    {G: "Charging Defect"}
  ];
  function convertCodesToNames(faultyString) {
        if(faultyString != null){
            const codes = faultyString
                .slice(1, -1)
                .split(',');
            return codes.map(code => {
                const option = faulty_options.find(opt => opt[code]);
                return option ? option[code] : code;
            });
        }else{
            return '';
        }
    }
function QuoteList({location}) {
   
    const phones = location.state.phones.map(phone => {
        return {
          ...phone,
          faulty_if_any: convertCodesToNames(phone.faulty_if_any),
        };
      });
      
    const quoteData = {
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
        quote: location.state.quote,
        items: phones
    }
    
    return (
        <Fragment>
            <PDFViewer width="1200" height="700" className="salesInvoice" >
                <Quote quote={quoteData}/>
            </PDFViewer>
        </Fragment>
    )
}

export default QuoteList;