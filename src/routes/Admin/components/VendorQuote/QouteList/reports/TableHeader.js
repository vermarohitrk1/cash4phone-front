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
    order: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    model: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    sell: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    offer: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    color: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    grade: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    warranty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    faulty: {
        width: '25%',
    },
  });

  const TableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.order}>Order Number</Text>
        <Text style={styles.model}>Model</Text>
        <Text style={styles.sell}>Sell Price</Text>
        <Text style={styles.offer}>Offer Price</Text>
        <Text style={styles.color}>Colour</Text>
        <Text style={styles.grade}>Grade</Text>
        <Text style={styles.warranty}>Warranty</Text>
        <Text style={styles.faulty}>Faulty If Any</Text>
    </View>
  );
  
  export default TableHeader