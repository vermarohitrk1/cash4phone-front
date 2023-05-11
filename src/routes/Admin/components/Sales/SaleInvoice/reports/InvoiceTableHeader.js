import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

// const borderColor = '#90e5fc';
const borderColor = '#0000';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        // backgroundColor: '#f58936',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    sno: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    imei_num: {
        width: '21%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    // barcode: {
    //     width: '20%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // },
    brand: {
        width: '11%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    model: {
        width: '53%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '10%',
    },
  });

  const InvoiceTableHeader = ({h1, h2, h3, h4, h5}) => (
    <View style={styles.container}>
        <Text style={styles.sno}>{h1}</Text>
        <Text style={styles.imei_num}>{h2}</Text>
        {/* <Text style={styles.barcode}>Barcode</Text> */}
        <Text style={styles.brand}>{h3}</Text>
        <Text style={styles.model}>{h4}</Text>
        <Text style={styles.amount}>{h5}</Text>
    </View>
  );
  
  export default InvoiceTableHeader