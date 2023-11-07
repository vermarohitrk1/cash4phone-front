import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderWidth: 1,
        // borderColor: '#bff0fd',
    },
});


  const ItemsTable = ({quote}) => {
    return (
    <View style={styles.tableContainer}>
        <TableHeader />
        <TableRow items={quote.items} />
    </View>
  )};
  
  export default ItemsTable