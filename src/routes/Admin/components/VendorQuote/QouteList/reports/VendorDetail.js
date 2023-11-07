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


  const VendorDetail = ({quote}) => (
        <View style={styles.bigContainer}>
            <View style={styles.container1}>
                <View style={styles.invoiceNoContainer}>
                    <Text style={styles.labelLeft}>Vendor Name :</Text>
                    <Text style={styles.invoiceDate}>{quote.vendor_name}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.labelLeft}>Vendor Phone Number : </Text>
                    <Text >{quote.vendor_phone}</Text>
                </View >
            </View>
        </View>
  );
  
  export default VendorDetail