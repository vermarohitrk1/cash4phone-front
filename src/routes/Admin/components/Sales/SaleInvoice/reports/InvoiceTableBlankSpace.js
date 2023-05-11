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

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.sno}>-</Text>
            <Text style={styles.imei_num}>-</Text>
            {/* <Text style={styles.barcode}>-</Text> */}
            <Text style={styles.brand}>-</Text>
            <Text style={styles.model}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace

