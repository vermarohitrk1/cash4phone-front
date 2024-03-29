import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: '15px',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        fontSize: '12px',
    },
    container1: {
        paddingLeft: 20,
        width: '50%',
        fontSize: '10px',
    },
    container2: {
        paddingLeft: 20,
        width: '50%',
        fontSize: '10px',
    },
    billTo: {
        marginTop: 10,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique',
        fontSize: '12px',
    },
  });


  const VendorDetails = ({invoice}) => (
    <View style={styles.headerContainer}>
        <View style={styles.container1}>
            <Text style={styles.billTo}>Ship To:</Text>
            <Text>{invoice.buyer_name}</Text>
            <Text>{invoice.buyer_num}</Text>
            <Text>{invoice.shipping_Address}</Text>
        </View>

        <View style={styles.container2}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{invoice.buyer_name}</Text>
            <Text>{invoice.buyer_num}</Text>
            <Text>{invoice.billing_address}</Text>
        </View>
    </View>
  );
  
  export default VendorDetails