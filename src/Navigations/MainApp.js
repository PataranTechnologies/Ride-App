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
const About_StackNavigator = createStackNavigator({
   About: {
     screen:About,
     navigationOptions: ({ navigation }) => {  return {    headerTitle: () => <Header title="Vision" backTo='Home' navigation={navigation} />  }; }
    }
 });

 DrawerNav=createDrawerNavigator({

    Home:{screen:Home},
    About:{screen:About_StackNavigator},
    
    Help:{screen:Help},
    
    MyAddresses:{screen:Myaddresses},
    
    Payments:{screen:Payments},
    
    Preferences:{screen:Preferences},
    
    ProfilePage:{screen:ProfilePage},
    
    Referal:{screen:Referal},
    
     TravelHistory:{screen:TravelHistory},
    
    

 },{
   initialRouteName: 'Home',
   contentComponent: CustomDrawerContentComponent,
   contentOptions: {
     activeTintColor: '#000000',
     activeBackgroundColor: '#e6e6e6',
   }
 })

 export default DrawerNav;