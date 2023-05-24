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
        width: '3%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    imei_num: {
        width: '18%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    order_num: {
        width: '10%',
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
        width: '43%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hsn: {
        width: '6%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '9%',
    },
  });

  const InvoiceTableHeader = ({h1, h2, h3, h4, h5, h6, h7}) => (
    <View style={styles.container}>
        <Text style={styles.sno}>{h1}</Text>
        <Text style={styles.imei_num}>{h2}</Text>
        <Text style={styles.order_num}>{h7}</Text>
        {/* <Text style={styles.barcode}>Barcode</Text> */}
        <Text style={styles.brand}>{h3}</Text>
        <Text style={styles.model}>{h4}</Text>
        <Text style={styles.hsn}>{h6}</Text>
        <Text style={styles.amount}>{h5}</Text>
    </View>
  );
  
  export default InvoiceTableHeader