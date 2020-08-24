import React, { Component, useState } from 'react';
import { View, StyleSheet,Text,TextInput, Image, Linking ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
const OtpValidationScreen=(props)=> {
  
    const [otp,setOtp]=useState("");


    const onSubmit=()=>{


        props.navigation.navigate("RegisterScreen")

    }
   
        return ( <View style={styles.container}>


            <View style={styles.innerContainer}>


                <View style={styles.otpVerifyTextView}>
                    <Text style={styles.otpVerifyText} >Ingresa el codigo de verificacion
                        </Text>

                    <Text style={styles.otpVerifyText}>
                        que te enviamos via SMS
                        </Text>
                    </View>
          
            <View style={styles.otprowInput}>
                           <TextInput value={otp} onChangeText={(text)=>setOtp(text)} style={styles.otpinput}  placeholder='Otp' />
                          
                            </View>


            <TouchableOpacity onPress={()=>{onSubmit()}} style={styles.verifyButton}>

<Text style={styles.buttonText}>Verificar</Text>

</TouchableOpacity>
                        
            </View>
                        </View> );
    }

 
export default OtpValidationScreen;


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
    otprowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20
        

    },
    otpinput:{
        flex:9,
        backgroundColor:'white',
    borderRadius:50,
      
        padding:10,
        paddingLeft:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        letterSpacing:20,

    },
    Icon:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
    },
    otpVerifyTextView:{
        marginTop:60,
        marginBottom:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
   otpVerifyText:{
       color:'gray',
       fontSize:17,
   },
  verifyButton:{


        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:150,
        marginBottom:30,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },

    rowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20
        

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
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
    },

})