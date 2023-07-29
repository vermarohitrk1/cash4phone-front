import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    bigContainer: {
        marginTop: '10px',
        flexDirection: 'row',
    },
    container1: {
        paddingLeft: 20,
        marginTop: 5,
        width: '50%',
        // backgroundColor: '#bff0fd',
    },
    container2: {
        paddingLeft: 20,
        marginTop: 5,
        width: '50%',
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        // marginTop: 12,
        justifyContent: 'flex-start'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    invoiceDate: {
            fontSize: 10,
            // fontStyle: 'bold',
    },
    payment: {
        width: 50,
        fontWeight: "ultrabold"
    },
    label: {
        width: 100,
        fontWeight: "heavy"
    },
    labelLeft: {
        width: 80,
        fontWeight: "heavy"
    },
    paylabel: {
        width: 60,
        fontWeight: "heavy"
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <View style={styles.bigContainer}>
            <View style={styles.container1}>
                <View style={styles.invoiceNoContainer}>
                    <Text style={styles.labelLeft}>Invoice No :</Text>
                    <Text style={styles.invoiceDate}>{invoice.invoice_number}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.labelLeft}>Date : </Text>
                    <Text >{invoice.sale_date}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.labelLeft}>Payment :</Text>
                    <Text style={styles.payment}>Cash : </Text>
                    <Text >{invoice.payment_cash}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.labelLeft}></Text>
                    <Text style={styles.payment}>Card : </Text>
                    <Text >{invoice.payment_card}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.labelLeft}></Text>
                    <Text style={styles.payment}>Transfer : </Text>
                    <Text >{invoice.payment_transfer}</Text>
                </View >
            </View>

            <View style={styles.container2}>
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>GSTIN : </Text>
                    <Text >{invoice.gst_number}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>PAN : </Text>
                    <Text >{invoice.pan_number}</Text>
                </View > 
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Payment Ref No : </Text>
                    <Text >{invoice.payment_ref_num}</Text>
                </View > 
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Supply Place : </Text>
                    <Text >{invoice.supply_place}</Text>
                </View > 
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>State Code : </Text>
                    <Text >{invoice.state_code}</Text>
                </View >
            </View>
        </View>
  );
  
  export default InvoiceNo