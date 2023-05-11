import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import Tnc from './Tnc';
import Header from './Header';
import Sign from './Sign';

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
  
  const Invoice = ({invoice}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Header cashforphone={invoice.cashforphone}/>
            <InvoiceTitle title='Invoice'/>
            <View style={{borderBottomColor: '#f58936', borderBottomWidth: 1}}/>
            <InvoiceNo invoice={invoice}/>
            <BillTo invoice={invoice}/>
            <InvoiceItemsTable invoice={invoice} />
            <Sign />
            <Tnc />
        </Page>
    </Document>
        );
  
  export default Invoice

  