import React, { Component } from 'react';
import LoginScreen from '../components/LoginScreen'
import RegisterScreen from '../components/register/RegisterScreen'
import PayInfo from '../components/register/PayInfo'
import {createStackNavigator,HeaderTitle} from 'react-navigation-stack'
import OtpValidationScreen from '../components/register/OtpValidationScreen'
import PhoneVerifyScreen from '../components/register/PhoneVerifyScreen'
import CustomHeader from  '../components/customHeader/customStack'
import Header from '../components/customHeader/header'
const option= {
    title: 'Chat',
    headerStyle: {
         backgroundColor: '#cc3300',
        
                   },
    headerTitleStyle: {
         color: 'white', 
         
        },
        

}
UserAuthStack=createStackNavigator({
    LoginScreen:{
        screen:LoginScreen,
        navigationOptions: {
            headerShown: false,
          }
    },
    PhoneVerifyScreen:{
        screen:PhoneVerifyScreen,
       
         navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Registro" backTo='LoginScreen' navigation={navigation} />,
               headerLeft:null,
    
    }; }
    },
    OtpValidationScreen:{screen:OtpValidationScreen,
        navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Ingresar codigo" backTo='PhoneVerifyScreen' navigation={navigation} />,
        headerLeft:null,

}; }},
    RegisterScreen:{screen:RegisterScreen,
        navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Registro de Usuario" backTo='PhoneVerifyScreen' navigation={navigation} />,
        headerLeft:null,

}; }},
    PayInfo:{screen:PayInfo,
        navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Metodo de pago" backTo='LoginScreen' navigation={navigation} />,
               headerLeft:null,
    
    }; }
    }

})

export default UserAuthStack;
