import React, { Component } from 'react';
import { createDrawerNavigator} from 'react-navigation-drawer'
import Home from '../components/MainApp/Home'
import CustomDrawerContentComponent from './CustomDrawerContentComponent'
import About from '../components/MainApp/About';
import Help from '../components/MainApp/Help';
import Myaddresses from '../components/MainApp/MyAddresses';
import Payments from '../components/MainApp/Payments';
import Preferences from '../components/MainApp/preferences';
import ProfilePage from '../components/MainApp/ProfilePage';
import Referal from '../components/MainApp/Referal';
import TravelHistory from '../components/MainApp/TravelHistory';
import {createStackNavigator} from 'react-navigation-stack'
import Header from '../components/customHeader/header'
import PagosPendientes from '../components/MainApp/PagosPendientes'
import ComprarCredito from '../components/MainApp/ComprarCredito';
import ProfileEdit from '../components/MainApp/profileEdit'
import ProfilePageHeader from '../components/customHeader/ProfilePageHeader'
import MyAddressesEdit from '../components/MainApp/MyAddressesEdit'
import MyAddressHeader from '../components/customHeader/MyAddressHeader'
import MyAddressesAdd from '../components/MainApp/MyAddressesAdd'
import WhereTo from '../components/MainApp/RideBookingScreens/WhereTo';
const About_StackNavigator = createStackNavigator({
   About: {
     screen:About,
     navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Vision" backTo='Home' navigation={navigation} />  }; }
    }
 });

 const Help_StackNavigator = createStackNavigator({
  Help: {
    screen:Help,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Ayuda" backTo='Home' navigation={navigation} />  }; }
   }
});

const MyAddresses_StackNavigator = createStackNavigator({
  MyAddresses: {
    screen:Myaddresses,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <MyAddressHeader title="Mis Direcciones" backTo='Home' goTo='MyAddressesAdd' navigation={navigation} />  }; }
   },
   MyAddressesEdit:{
     screen:MyAddressesEdit,
     navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Editar Direccion" backTo='MyAddresses'  navigation={navigation} />,
    headerLeft:null,
    }; }
     
   },
   MyAddressesAdd:{
    screen:MyAddressesAdd,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Nueva Direccion" backTo='MyAddresses'  navigation={navigation} />,
   headerLeft:null,
   }; }
    
  },
});

const Payments_StackNavigator = createStackNavigator({
  Payments: {
    screen:Payments,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Pagos" backTo='Home' navigation={navigation} />  }; }
   },
   PagosPendientes: {
    screen:PagosPendientes,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Pagos Pendientes" backTo='Payments' navigation={navigation} /> ,
    headerLeft:null,
   }; }
   },
   ComprarCredito: {
    screen:ComprarCredito,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Comprar Credito" backTo='Payments' navigation={navigation} /> ,
    headerLeft:null,
   }; }
   },

});

const Preferences_StackNavigator = createStackNavigator({
  Preferences: {
    screen:Preferences,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Preferencias" backTo='Home' navigation={navigation} />  }; }
   }
});


const Profile_StackNavigator = createStackNavigator({
  ProfilePage: {
    screen:ProfilePage,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <ProfilePageHeader title="Perfil" backTo='Home' goTo='ProfileEdit' navigation={navigation} />  }; }
   },
   ProfileEdit: {
    screen:ProfileEdit,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Editar prefil" backTo='ProfilePage' navigation={navigation} /> ,
    headerLeft:null,
   }; }
   },
});


const TravelHistory_StackNavigator = createStackNavigator({
  TravelHistory: {
    screen:TravelHistory,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Historial de Viajes" backTo='Home' navigation={navigation} />  }; }
   }
});


const Referal_StackNavigator = createStackNavigator({
  Referal: {
    screen:Referal,
    navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Promociones" backTo='Home' navigation={navigation} />  }; }
   }
});



const Home_StackNavigator = createStackNavigator({
  Home: {
    screen:Home,
   
   },
WhereTo: {
  screen:WhereTo,
  navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="¿A donde deseas ir" backTo='Home' navigation={navigation} /> ,
  headerLeft:null,
 }; }
 },

}
);
 DrawerNav=createDrawerNavigator({

    Home:{screen:Home_StackNavigator},
    About:{screen:About_StackNavigator},
    
    Help:{screen:Help_StackNavigator},
    
    MyAddresses:{screen:MyAddresses_StackNavigator},
    
    Payments:{screen:Payments_StackNavigator},
    
    Preferences:{screen:Preferences_StackNavigator},
    
    ProfilePage:{screen:Profile_StackNavigator},
    
    Referal:{screen:Referal_StackNavigator},
    
     TravelHistory:{screen:TravelHistory_StackNavigator},
    
    

 },{
   initialRouteName: 'Home',
   contentComponent: CustomDrawerContentComponent,
   contentOptions: {
     activeTintColor: '#000000',
     activeBackgroundColor: '#e6e6e6',
   }
 })

 export default DrawerNav;