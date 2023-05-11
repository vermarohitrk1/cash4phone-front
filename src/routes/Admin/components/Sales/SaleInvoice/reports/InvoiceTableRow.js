import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'black'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 10
    },
    sno: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    imei_num: {
        width: '21%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        // paddingLeft: 8,
    },
    // barcode: {
    //     width: '20%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    //     textAlign: 'right',
    //     paddingRight: 8,
    // },
    brand: {
        width: '11%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    model: {
        width: '53%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        // paddingRight: 8,
    },
    amount: {
        width: '10%',
        textAlign: 'center',
        // paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    let i = 1;
    items.map(item => {item.sno = i; i++})
    const rows = items.map( item => 
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.sno}>{item.sno}</Text>
            <Text style={styles.imei_num}>{item.imei_num}</Text>
            {/* <Text style={styles.barcode}>{item.barcode}</Text> */}
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.amount}>{item.selling_price}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow