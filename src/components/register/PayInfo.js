import React, { Component, useState } from 'react';
import { View, StyleSheet,Text, Image, Linking,TextInput,TouchableOpacity  } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/FontAwesome';
import Visa from '../../../images/visa.png'
import mastercard from '../../../images/mastercard.jpg'
const PayInfo=(props)=> {

    const [activateWallet,setActivateWallet]=useState(true)
    const [activateCard,setActivateCard]=useState(false)
    
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [cardExpDate,setCardExpDate]=useState('');
    const [cardCVV,setCardCVV]=useState('');
    const [cardType,setCardType]=useState(Visa);
    const valCardDate=(date)=>{

        setCardExpDate(date);

    }

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
    cardRender=()=>{

        return (


            <View style={styles.card}>
                <Text style={styles.cardTitles}>Numero de Terjeta</Text>
                <View style={styles.cardUpper}>

                    <TextInput maxLength={16} value={cardNumber} onChangeText={(text)=>identifyCard(text)} style={styles.cardInput,styles.cardNumber} />
                    <Image style={styles.cardImage} source={cardType} /> 

                </View>
                <Text style={styles.cardTitles}>Nombre</Text>
                <TextInput style={styles.cardInput} value={cardHolderName} onChangeText={()=>setCardHolderName(text)} />
                <View style={styles.cardLower}>
                <View style={styles.cardLowerLeft}>
                <Text style={styles.cardTitles}>MM/AA</Text>
                <View>
                    <TextInput maxLength={5} value={cardExpDate} onChangeText={(text)=>valCardDate(text)} style={styles.cardInput} />
                </View>
                </View>
                <View style={styles.cardLowerRight}>
                <Text style={styles.cardTitles}>CVV</Text>
                <View>
                    <TextInput secureTextEntry={true} maxLength={3} value={cardCVV} onChangeText={()=>setCardCVV(text)} style={styles.cardInput} />
                </View>
                </View>
                </View>

                </View>

        );
    }
  
        return (<View style={styles.container}>


            <View style={styles.innerContainer}>
           
           <Text style={styles.payHeading}>Agrega la forma de pago de tus viajes</Text >
            
            <View style={styles.rowWallet}>
                           <Icon name="money" style={styles.Icon} />
                           <Text style={styles.payOptionText}>Efectivo</Text>
                           <View style={styles.switchpay}>
                           <Switch  value={activateWallet} onValueChange={()=>setActivateWallet(!activateWallet)} />
                            </View>
                           </View> 
            <View style={styles.cardAct}>
            <View style={styles.rowInput}>
                           <Icon name='credit-card' style={styles.Icon}/> 
                           <Text style={styles.payOptionText}>Tarjeta</Text>
                           <View style={styles.switchpay}>
                           <Switch value={activateCard} onValueChange={()=>setActivateCard(!activateCard)} />
                            </View>

                           </View> 

                           {
                                activateCard?cardRender():null
                            }

</View>



            <TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.save}>

<Text style={styles.buttonText}>Guardar</Text>

</TouchableOpacity>


<TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.skip}>

<Text style={styles.buttonTextSkip}>Omitir</Text>

</TouchableOpacity>
                        
            </View>
                        </View> );
    }

 
export default PayInfo;
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    innerContainer:{
        
        margin:20,
        marginTop:30,
    },
    phone:{
        width:'100%',
        flexDirection:'row',

    },
    countryCode:{
        flex:4,
    },
    phoneNo:{
        flex:6,
        
        
    },
    rowWallet:{
        width:'100%',
        flexDirection:'row',
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        backgroundColor:'white',
        borderRadius:30,

        padding:10,
        paddingLeft:20,
        alignItems:'center'
        
  
    },
    rowInput:{
        width:'100%',
        flexDirection:'row',

        
  
        

    },
    cardAct:{
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        backgroundColor:'white',
        borderRadius:30,

        padding:10,
        paddingLeft:20,
        
        
    },
    input:{
        flex:9,
        backgroundColor:'white',

        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        padding:10,
        paddingLeft:20
    },
    Icon:{
        fontSize:25,
          color:'blue',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
    },
    switchpay:{
     flex:1,
     flexDirection:'row-reverse'

    },
    
    payOptionText:{
        marginLeft:10,
        fontSize:15

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
    skip:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0000cc',
        borderWidth:2,
        padding:15,
        borderRadius:30,
        marginTop:10,
        marginBottom:30,

    },

    buttonTextSkip:{
        color:'#0000cc',
        fontWeight:'bold',
        fontSize:20
    },

    payHeading:{
        marginTop:20,
        alignSelf:'center',
        color:'gray',
        fontSize:18,
        marginBottom:30,
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
        padding:0,
    },
    cardTitles:{
        color:'#6699cc'
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
        padding:0,

    },

})