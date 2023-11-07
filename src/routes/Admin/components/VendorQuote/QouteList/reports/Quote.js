import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import VendorDetail from './VendorDetail'
import ItemsTable from './ItemsTable'
import Title from './Title'
import Header from './Header';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 10,
        paddingLeft:30,
        paddingRight:30,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
  });
  
  const Quote = ({quote}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Header cashforphone={quote.cashforphone}/>
            <Title title='Quotes'/>
            <View style={{borderBottomColor: '#f58936', borderBottomWidth: 1}}/>
            <VendorDetail quote={quote.quote}/>
            <ItemsTable quote={quote} />
        </Page>
    </Document>
        );
  
  export default Quote

  