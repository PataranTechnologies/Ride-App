import React, { Component,useState } from 'react';
import { Switch,View,StyleSheet,TextInput,Image,TouchableWithoutFeedback, Text,TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Visa from '../../../images/visa.png'
import mastercard from '../../../images/mastercard.jpg'



const ComprarCredito=(props)=>{



    const [cardType,setCardType]=useState(Visa);

    const identifyCard=(text)=>{
        setCardNumber(text);
        if(text.startsWith('5'))
        {
         setCardType(mastercard);
        }
        else
        if(text.startsWith('4'))
        {


            setCardType(Visa)
        }
    }

    const getCardType=()=>{
        return cardType;
    }

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>

            <Text style={styles.title}>Agrega los datos de tu tarjeta</Text>



       <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.cardTitles}>Numero de Terjeta</Text>
                <View style={styles.cardUpper}>

                    <Text maxLength={16}  style={styles.cardNumber} ></Text>
                    <Image style={styles.cardImage} source={cardType} /> 

                </View>
                <Text style={styles.cardTitles}>Nombre</Text>
                <Text style={styles.cardInput}  ></Text>
                <View style={styles.cardLower}>
                <View style={styles.cardLowerLeft}>
                <Text style={styles.cardTitles}>MM/AA</Text>
                <View>
                    <Text maxLength={5}  style={styles.cardInput} ></Text>
                </View>
                </View>
                <View style={styles.cardLowerRight}>
                <Text style={styles.cardTitles}>CVV</Text>
                <View>
                    <Text secureTextEntry={true} maxLength={3}   style={styles.cardInput} ></Text>
                </View>
                </View>
                </View>

                </View>

</View>


<Text style={styles.titleAmount}>Monto a recargar</Text>

<View style={styles.creditRow}>
             <Icon style={styles.currencyIcon} name='currency-eur' />
             <Text style={styles.creditValue}>
             {props.creditInfo ? props.creditInfo.amount : "000.00" }
             </Text>
</View>



<TouchableOpacity  style={styles.save}>

<Text style={styles.buttonText}>Guadar</Text>

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
    title:{
        color:'gray',
        alignSelf:'center',
        fontSize:18,
        marginBottom:20,
    },
    cardContainer:{
        backgroundColor:'white',
        borderRadius:30,
        padding:20,
        marginTop:20,
    },

    card:{
        marginTop:10,
    },
    cardLower:{
        flexDirection:'row',
    },
    cardLowerLeft:{
      flex:1,
      margin:5,
    },
    cardLowerRight:{
        flex:1,
        margin:5,
    },
    cardInput:{
        borderBottomWidth:1,
        borderBottomColor:'#ebebe0',
        padding:5,
    },
    cardTitles:{
        color:'#0000b3'
    },
    cardUpper:{
        flexDirection:'row'
    },

    cardImage:{
        flex:2,
        width:'80%',
        height:'80%',
        marginLeft:5,
    },
    cardNumber:{
        flex:8,
        borderBottomWidth:1,
        borderBottomColor:'#ebebe0',
        padding:5,

    },
    titleAmount:{
        color:'black',
        fontSize:17,
        alignSelf:'center',
        marginTop:40,
    },
    credit:{
       
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
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:30,
        padding:10
    },
    currencyIcon:{
        fontSize:40,
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

  
})
export default ComprarCredito