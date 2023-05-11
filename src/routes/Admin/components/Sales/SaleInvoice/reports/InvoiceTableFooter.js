import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { Fragment } from 'react';

const borderColor = 'black'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '35%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        fontSize: 10,
        // paddingRight: 8,
    },
    total: {
        width: '65%',
        textAlign: 'center',
        // paddingRight: 8,
        fontSize: 10,
    },
  });


const InvoiceTableFooter = ({text, value}) => {
    return(  
        <Fragment>
            <View style={styles.row}>
                <Text style={styles.description}>{text}</Text>
                <Text style={styles.total}>{value}</Text>
            </View>
        </Fragment>
    )
};
  
  export default InvoiceTableFooter