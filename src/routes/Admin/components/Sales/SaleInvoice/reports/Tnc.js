import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        // flexDirection: 'row',
        marginTop: 12
    },
    reportTitle:{
        fontSize: 12,
        textAlign: 'left',
        // textTransform: 'uppercase',
    },
    content:{
        fontSize: 10,
        textAlign: 'left',
    }
  });


  const Tnc = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Terms and Conditions :</Text>
        <Text style={styles.content}>1. Value of supply is determined in accordance to section 15(15)
         of the Central Goods and Services Tax Act read with Rule 32(5) of "Determination of Value of Supply" rules. 
         The Credit for GST input shall not be available to the buyer if buyer follows the same valuation rule. </Text>
        <Text>2. Goods once sold cannot be returned and the buyer assumes all responsibility of Goods once taken out of 
        Seller's premises physically by Buyer or Buyer's representative(s). </Text>
        <Text>3. Buyer agrees to save and hold seller harmless from claims, demands, liabilities, costs, expenses
         or judgement arising in whole or in part, directly or indirectly, out of negligence of Buyer involving the goods supplied by Seller. </Text>
    </View>
  );
  
  export default Tnc