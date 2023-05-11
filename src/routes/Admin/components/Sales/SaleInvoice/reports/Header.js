import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import logo from '../../SaleInvoice/logo.png';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        // backgroundColor: '#ffceb5',
        borderColor: '#ffceb5'
    },
    container1: {
        fontSize: '8',
        width: '35%',
        paddingLeft: 20
    },
    container2: {
        fontSize: '8',
        width: '30%',
        paddingLeft: 40
    },
    container3: {
        width: '35%',
    },
    cashname: {
        // fontFamily: 'Roboto-Bold',
        fontWeight: 700,
        fontSize: '13',
    }, 
    name: {
        fontWeight: 'bold',
    }, 
    logo: {
        width: 120,  
        height: 70,
        display: 'flex',
        
        // marginLeft: 'auto',
        marginRight: 'auto'
    }
  });


  const Header = ({cashforphone}) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container3}>
                <Image style={styles.logo} src={logo} />
            </View>
            <View style={styles.container1}>
                <Text style={styles.cashname}>{cashforphone[0].name}</Text>
                <Text><b>GSTIN : </b>{cashforphone[0].gstin}</Text>
                <Text>CIN : {cashforphone[0].cin}</Text>
                <Text>State Code : {cashforphone[0].state_code}</Text>
            </View>

            <View style={styles.container2}>
                <Text>{cashforphone[0].registered_address}</Text>
                <Text>Website : {cashforphone[0].website}</Text>
                <Text>Phone : {cashforphone[0].phone}</Text>
                <Text>Email : {cashforphone[0].email}</Text>
            </View>
        </View>
  )};
  
  export default Header;