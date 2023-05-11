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
        width: '90%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '10%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const Total = ({text, value}) => {
    return(  
        <Fragment>
            <View style={styles.row}>
                <Text style={styles.description}>{text}</Text>
                <Text style={styles.total}>{value}</Text>
            </View>
        </Fragment>
    )
};
  
  export default Total