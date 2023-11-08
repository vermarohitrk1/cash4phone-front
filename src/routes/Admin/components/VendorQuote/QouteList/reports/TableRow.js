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
    order: {
        width: '10%',
        fontSize: '10px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    model: {
        width: '20%',
        fontSize: '10px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    sell: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    offer: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    color: {
        width: '10%',
        fontSize: '10px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    grade: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    warranty: {
        width: '10%',
        fontSize: '10px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    faulty: {
        width: '25%',
        fontSize: '9px',
        textAlign: 'center',
    },
  });


const TableRow = ({items}) => {
    let i = 1;
    items.map(item => {item.sno = i; i++})
    const rows = items.map( item => 
        
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.order}>{item.order_num}</Text>
            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.sell}>{item.vendor_price || 0}</Text>
            <Text style={styles.offer}>{item.offer_price || '-'}</Text>
            <Text style={styles.color}>{item.phone_color || '-'}</Text>
            <Text style={styles.grade}>{item.grade || '-'}</Text>
            <Text style={styles.warranty}>{item.warranty_till || '-'}</Text>
            {/* <Text style={styles.faulty}>{(item.faulty_if_any || ['No']).split(',').join('\n')}</Text> */}
            <Text style={styles.faulty}>
                {Array.isArray(item.faulty_if_any) 
                    ? item.faulty_if_any.join('\n') 
                    : item.faulty_if_any || 'No'}
            </Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default TableRow