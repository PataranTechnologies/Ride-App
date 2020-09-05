import React, { Component, useState } from 'react';
import { View, StyleSheet,Text, ImageBackground,Image, Linking  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo'
import logo from '../../assets/images/logo_login.png'
import Header from '../../assets/images/header.png'
import { useNetInfo } from "@react-native-community/netinfo";
import DefaultTheme from '../constants/DefaultTheme';
const { header, card, secondary} = DefaultTheme.colors;
import AsyncStorage from '@react-native-community/async-storage';

import APIKit, { setClientToken } from '../utils/APIKit';

import TextInputIconRight from '../components/TextInputIconRight';
import PrimaryButton from '../components/PrimaryButton';
import SharedStyles from '../constants/SharedStyles';
import CustomAlert from '../components/CustomAlert';
const LoginScreen =(props)=> {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

const onForgot=()=>{
  Linking.openURL("http://ride.rideapp.com/forgot").catch(err=>{

  alert("Some Error Occured,Can't Change password,Try Again");
  })    
    }


   const onLogin=()=>
    {
        props.navigation.navigate('MainApp')
    }

    const onRegister=()=>{
     
        props.navigation.navigate("PhoneVerifyScreen")
      }

    const [data, setData] = React.useState({
        email: '',
        password: '',
      });
    
      const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
      });
    
      
    
      const netInfo = useNetInfo();
    
      let passwordInput = React.createRef();
    
      const focusNextField = () => {
        passwordInput.current.focus();
      }
      

     
    
      const handleEmailChange = (text) => {
        setData({
          ...data,
          email: text
        });
      }
    
      const handlePasswordChange = (text) => {
        setData({
          ...data,
          password: text
        });
      }
    
      const validateData = () => {
        const { email, password } = data;
        //alert('Type: ' +  netInfo.type + ', Is Connected? ' + netInfo.isConnected.toString())
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if (email === '' || !regex.test(email.trim())) {
          setAlertData({
            isVisible: true,
            title: 'Email inválido',
            description: 'Asegúrese de ingresar un email válido',
          });
        } else if (password === '' || password.length<8 ) {
          setAlertData({
            isVisible: true,
            title: 'Contraseña inválida',
            description: 'Asegúrese de ingresar una contraseña válida',
          });
        }else {
          setAlertData({
            isVisible: true,
            title: 'Iniciando sesión',
            showProgress: true,
            showConfirmButton: false,
          });
          login();
        }
      }
    
      const login = () => {
        const { email, password } = data;
    
        let payload = new FormData();  
        payload.append('email', email.trim()), 
        payload.append('password', password.trim())
    
        const onSuccess = async ({ data }) => {
          //se configura el client token para el APIKit
          console.log('LOGIN DATA: ');
          console.log(data);
          setClientToken(data.token);
          try {
            await AsyncStorage.setItem('@ride/userToken', data.token)
          } catch (e) {
            console.log(e);
          }
          setAlertData({
            ...alertData,
            isVisible: false,
          });
         
        };
    
        const onFailure = error => {
          console.log(JSON.stringify(error));
          if(error.response.data.error == "Unauthorised") {
              setAlertData({
                isVisible: true,
                title: 'Error',
                description: 'Email o contraseña invalido, intente otra vez',
                showProgress: false,
                showConfirmButton: true,
              });
          } else if (error.response.data.error == "El email no existe en nuestros registros" ) {
            setAlertData({
              isVisible: true,
              title: 'Email no registrado',
              description: 'El email no existe en nuestros registros',
              showProgress: false,
              showConfirmButton: true,
            });
          } else {
            setAlertData({
              isVisible: true,
              title: 'Error',
              description: error.message,
              showProgress: false,
              showConfirmButton: true,
            });
          }
        };
    
        APIKit.post('/auth/login', payload)
          .then(onSuccess)
          .catch(onFailure);
      }
    
      const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
      }
    

    
        return ( <View style={styles.container}>
            

<CustomAlert
          isVisible={alertData.isVisible}
          title={alertData.title}
          description={alertData.description}
          onBackButtonPress={hideAlert}
          onConfirmPressed={hideAlert}
          showProgress={alertData.showProgress}
          showConfirmButton={alertData.showConfirmButton}
        />



                <View style={styles.loginHeader}>
              
                <View style={styles.headerBack}>
               <ImageBackground style={styles.headerBackImage} source={Header}>




                    <View style={styles.headerImage}>
                    <Image  style={styles.headerImageStyle} source={logo} />
                    </View>
</ImageBackground>
                    </View>

                </View>

                <View>

                    <View style={styles.loginForm}>

                        <View style={styles.mainForm}>

                            <Text style={styles.formHeader}>¡Bienvenido a Ride!</Text>
                            <Text style={styles.formInnerHeader}> inicia Sesion para continuar</Text>

                            <TextInputIconRight 
            autoCompleteType={'username'}
            autoCapitalize={'none'}
            blurOnSubmit={false}
            iconName="email-outline"
            maxLength={250}
            onChangeText={(email) => handleEmailChange(email)}
            onSubmitEditing={() => focusNextField() }
            placeholder="Email"
            returnKeyType={'next'}
          />
          <TextInputIconRight
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            iconName="lock-open-outline"
            maxLength={150}
            onChangeText={(password) => handlePasswordChange(password)}
            onSubmitEditing={() => validateData()}
            placeholder="Contraseña"
            ref={passwordInput}
            secureTextEntry={true}
          />

                           <View style={styles.forgot}>
                             <Text style={styles.forgotText1}>¿Olvidas tu contrasena?</Text>
                             <Text onPress={()=>onForgot()} style={styles.forgotText2}>Recuperala</Text>
                           </View>

                          
                               <PrimaryButton
            containerStyle={{ marginVertical: 36 }}
            onPress={() => onLogin()}
            title="Entrar"
          />


                               <View  style={styles.registerView}>
                               <Text style={styles.rvText1}>¿No tienes una cuenta?</Text>
                             <Text onPress={()=>onRegister()} style={styles.rvText2}>Registrate</Text>
                          

                                   </View>


                            </View>

                            <View style={styles.mainForm}>


</View>
</View>
                        </View>
                        

            </View> );
    }


const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#e6f2ff',
    },

    loginHeader:{
        width:'100%',
        height:'20%',
      
        },
        headerBack:{
            backgroundColor:header,
            width:'100%',
            height:150,
            alignItems:'center',
            borderBottomEndRadius:30,
            borderBottomLeftRadius:30,
            flexDirection:'column-reverse'
            
        },
        headerBackImage:{
            margin:10,
            width:'95%',
            height:'95%',
            flexDirection:'column-reverse'
    
        },
        headerImage:{
            
            width:120,
            height:120,
            borderRadius:120,
            backgroundColor:'white',
             margin:-60,
             justifyContent:'center',
             alignItems:'center',
             alignSelf:'center',
    
        },
        headerImageStyle:{

            width: 90,
            height:70,
    
    
        },
    loginForm:{
        margin:20,
        marginTop:60,

        padding:10

    },

    formHeader:{
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center'
    },
    formInnerHeader:{

        fontSize:14,
        color:'gray',
        alignSelf:'center'
    },
    

  
    forgot:{

        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
        marginTop:20,



    },
    forgotText1:{

        color:'gray',

    },forgotText2:{

        color:'black',
        fontWeight:"bold"

    },

    
    registerView:{
        justifyContent:'center',
        alignItems:'center',
       marginTop:10,
        alignSelf:"stretch"
    },
    rvText1:{
        color:'gray',
    },
    rvText2:{
        color:'black',
        fontWeight:'bold',
        fontSize:20
    },


})
 
export default LoginScreen;