import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 15,
        flexDirection: 'row-reverse'
    },
    container: {
        flexDirection: 'column',
        width: '30%',
    }
  });


  const Sign = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <Text style={styles.name}>For KNOVEDAD PVT LTD</Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>
                <Text>Authorized Signatory</Text>
            </View>
        </View>
  )};
  
  export default Sign;