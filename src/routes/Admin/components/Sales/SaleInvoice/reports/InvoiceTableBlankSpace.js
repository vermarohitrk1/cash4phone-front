import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'black'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
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

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.sno}>-</Text>
            <Text style={styles.imei_num}>-</Text>
            <Text style={styles.order_num}>-</Text>
            {/* <Text style={styles.barcode}>-</Text> */}
            <Text style={styles.brand}>-</Text>
            <Text style={styles.model}>-</Text>
            <Text style={styles.hsn}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace

