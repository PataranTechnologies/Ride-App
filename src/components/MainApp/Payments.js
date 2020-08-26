import React, { Component,useState } from 'react';
import { Switch,View,StyleSheet,TextInput,Image,TouchableWithoutFeedback, Text,TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Visa from '../../../images/visa.png'
import mastercard from '../../../images/mastercard.jpg'


const Payments=(props)=>{

    const [activateWallet,setActivateWallet]=useState(true)
    const [activateCard,setActivateCard]=useState(false)
    const [activateCredit,setActivateCredit]=useState(false)
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [cardExpDate,setCardExpDate]=useState('');
    const [cardCVV,setCardCVV]=useState('');
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
    const toCardDetails=()=>{
        props.navigation.navigate('ComprarCredito');
    }


    const toPagoPen=()=>{
        props.navigation.navigate('PagosPendientes');
    }

    const cardRender=()=>{

        return (


            <View style={styles.card}>
                <Text style={styles.cardTitles}>Numero de Terjeta</Text>
                <View style={styles.cardUpper}>

                    <Text maxLength={16} value={cardNumber} onChangeText={(text)=>identifyCard(text)} style={styles.cardNumber} />
                    <Image style={styles.cardImage} source={cardType} /> 

                </View>
                <Text style={styles.cardTitles}>Nombre</Text>
                <Text style={styles.cardInput} value={cardHolderName} onChangeText={()=>setCardHolderName(text)} />
                <View style={styles.cardLower}>
                <View style={styles.cardLowerLeft}>
                <Text style={styles.cardTitles}>MM/AA</Text>
                <View>
                    <Text maxLength={5} value={cardExpDate} onChangeText={(text)=>valCardDate(text)} style={styles.cardInput} />
                </View>
                </View>
                <View style={styles.cardLowerRight}>
                <Text style={styles.cardTitles}>CVV</Text>
                <View>
                    <Text secureTextEntry={true} maxLength={3} value={cardCVV} onChangeText={()=>setCardCVV(text)} style={styles.cardInput} />
                </View>
                </View>
                </View>

                </View>

        );
    }

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>


<TouchableWithoutFeedback onPress={()=>{toPagoPen()}}>
       <View style={styles.pagosPend}>
        <Text style={styles.pagosPendText} >Ver mis pagos pendientes</Text>
           <View style={styles.IconContainer}>
               <Icon  name='chevron-right' style={styles.pagoPendIcon} />
               </View>
       </View>
       </TouchableWithoutFeedback>

       <Text style={styles.patTitle}>Elegir metodo de pago</Text>

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
                                activateCard?<TouchableWithoutFeedback onPress={()=>{toCardDetails()}}>{cardRender()}</TouchableWithoutFeedback>:null
                            }

</View>


<View style={styles.rowWallet}>
                           <Icon name='credit-card' style={styles.Icon}/> 
                           <View style={styles.payOptionText}>
                           <Text style={styles.credit} >Credito</Text>
                           <Text style={styles.creditRecgarge}>Recargar Credito</Text>
                           </View>
                           <View style={styles.switchpay}>
                           <Switch value={activateCredit} onValueChange={()=>setActivateCredit(!activateCredit)} />
                            </View>

                           </View> 



            <TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.save}>

<Text style={styles.buttonText}>Guardar</Text>

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
        padding:5,

        
  
        

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
        padding:5,
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
        padding:5,

    },
    credit:{
        fontSize:15,
    },
    creditRecgarge:{
        fontSize:12,
        color:'blue',
        
    },
    pagosPend:{
        flexDirection:'row',
        
        alignItems:'center',
        marginBottom:20,
    },
    pagosPendText:{
        alignSelf:'flex-start',
        fontSize:18,
        color:'#0000b3',
    },
    IconContainer:{
        flex:1,
     flexDirection:'row-reverse'

        
    },
    pagoPendIcon:{
        color:'#0000b3',
        fontSize:18,
        
    },
    patTitle:{
        fontWeight:'bold',
        fontSize:15,
    },

  
})
export default Payments