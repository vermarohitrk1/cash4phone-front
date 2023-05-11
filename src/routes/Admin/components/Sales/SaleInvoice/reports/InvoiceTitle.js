import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    reportTitle:{
        width: '100%',
        color: '#f58936',
        letterSpacing: 4,
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default InvoiceTitle