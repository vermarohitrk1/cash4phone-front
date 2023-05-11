import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter';
import TaxHeader from './TaxHeader';
import Total from './Total';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        // borderColor: '#bff0fd',
    },
});


  const InvoiceItemsTable = ({invoice}) => {
    let ncr = false;
    let roi = false;
    if(invoice.state_code == 7) {
      ncr = true;
    } else {
      roi = true;
    }

    return (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader h1={"no"} h2={"IMEI Number"} h3={"Brand"} h4={"Model"} h5={"Amount"} />
        <InvoiceTableRow items={invoice.items} />
        <InvoiceTableBlankSpace rowsCount={1} />
        <Total text={"Total (inclusive of GST)"} value={invoice.selling_amount}/>
        <InvoiceTableFooter text={"Shorts and Excesses"} value={0}/>
        <InvoiceTableFooter text={"Discount Applied"} value={invoice.discount}/>
        <Total text={"Total (after Discount)"} value={invoice.selling_amount - invoice.discount}/>
        <InvoiceTableFooter text={"Amount in words (inclusive GST)"} value={invoice.payment_words}/>
        {ncr && <TaxHeader h1={"Tax Bifurcation"} h2={"CGST(9%)"} h3={"SGST(9%)"} h4={"IGST(0%)"} h5={"Total Tax"} />}
        {ncr && <TaxHeader h1={" "} h2={parseInt(invoice.gst_amt)/2} h3={parseInt(invoice.gst_amt)/2} h4={"0"} h5={invoice.gst_amt} />}
        {roi && <TaxHeader h1={"Tax Bifurcation"} h2={"CGST(0%)"} h3={"SGST(0%)"} h4={"IGST(18%)"} h5={"Total Tax"} />}
        {roi && <TaxHeader h1={" "} h2={"0"} h3={"0"} h4={parseInt(invoice.gst_amt)} h5={invoice.gst_amt} />}
    </View>
  )};
  
  export default InvoiceItemsTable