import React, { Component } from 'react';
import { View,StyleSheet,TextInput, Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PagosPendientes=(props)=>{

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>


<View style={styles.credit}>
         <Text style={styles.saldo}>
             saldo a pagar
             </Text>
             <View style={styles.creditRow}>
             <Icon style={styles.currencyIcon} name='currency-eur' />
             <Text style={styles.creditValue}>
             {props.creditInfo ? props.creditInfo.amount : "000.00" }
             </Text>
</View>

</View>

        <TouchableOpacity  style={styles.save}>

<Text style={styles.buttonText}>Aceptar</Text>

</TouchableOpacity>








     </View>
         </View>
    );
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    innerContainer:{
        
        margin:20,
        marginTop:30,
        padding:10
    },
    save:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:60,
        
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    credit:{
        backgroundColor:'white',
        borderRadius:30,
        padding:30
    },
    saldo:{
        alignSelf:'center',
        fontSize:18,
    },
    creditValue:{
        fontSize:40,
        fontWeight:'bold'
    },
    creditRow:{

        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        flexDirection:'row'
    },
    currencyIcon:{
        fontSize:40,
    },
  
})
export default PagosPendientes