import React, { Component, useState } from 'react';
import { View, StyleSheet,Text,TextInput, Image, Linking ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import TextInputMask from 'react-native-text-input-mask';
import SharedStyles from '../../constants/SharedStyles';
import Header from '../../components/Header';
import DefaultTheme from '../../constants/DefaultTheme';
import PrimaryButton from '../../components/PrimaryButton';
import CustomAlert from '../../components/CustomAlert';
const { card, primary, secondary, textInput } = DefaultTheme.colors;

const OtpValidationScreen=(props)=> {
  
    const [otp,setOtp]=useState("");
    
    const [verificationCode, setVerificationCode] = React.useState('123456');
    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
    });

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    }

    const validateCode = () => {
        setAlertData({
            isVisible: true,
            title: 'Verificando código ...',
            description: '',
            showConfirmButton: false,
            showProgress: true,
        });
        setTimeout(() => {
            if (verificationCode !== '123456') {
                setAlertData({
                    isVisible: true,
                    title: 'Código de verificación inválido',
                    description: 'El código ingresado no corresponde al enviado, intente otra vez',
                    showConfirmButton: true,
                    showProgress: false,
                });
            } else {
                hideAlert();
                const { countryCode, phoneNumber } = props.route.params;
                props.navigation.navigate('SignUp', {
                    countryCode,
                    phoneNumber
                })
            }
        }, 2000);
    }

    const onSubmit=()=>{
      
        
        const { countryCode, phoneNumber } = props.navigation.state.params;

       
                props.navigation.navigate('RegisterScreen', {
                    countryCode,
                    phoneNumber
                })

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
            <TextInputMask
                            keyboardType={'number-pad'}
                            value={verificationCode}
                            placeholder={'0  0  0  0  0  0'}
                            placeholderTextColor={textInput}
                            style={styles.textInputStyle}
                            onChangeText={(formatted, extracted) => {
                                setVerificationCode(extracted)
                            }}
                            mask={"[0]  [0]  [0]  [0]  [0]  [0]"}
                        />
                            </View>


           <PrimaryButton
           containerStyle={{ marginVertical: 36 }}
           onPress={() => onSubmit()}
           title="Verificar"
           />
                        
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
        backgroundColor:'white',
        borderRadius:30,

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
    body: {
        flex: 1,
        margin: 20,
        marginTop: 40
    },
    title: {
        marginTop: 15,
        marginBottom: 40,
        textAlign: 'center',
        color: secondary,
        fontFamily: 'Sarabun-Regular',
        fontSize: 18,
    },
    textInputContainer: {
        alignItems: 'center',
        backgroundColor: card,
        height: 46,
        paddingHorizontal: 25,
        elevation: 3,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    textInputStyle: {
        color: textInput,
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },

})