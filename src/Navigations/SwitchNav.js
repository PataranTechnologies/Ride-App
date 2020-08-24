import React, { Component } from 'react';
import {createSwitchNavigator} from 'react-navigation'
import SplashScreen from '../components/SplashScreen'
import UserAuthStack from './UserAuthStack'
import MainApp from './MainApp'


SwitchNav=createSwitchNavigator({

    SplashScreen:{
        screen:SplashScreen,
    },
    UserAuthStack:{
        screen:UserAuthStack,
    },
    MainApp:{
        screen:MainApp,
    }
})
 
export default SwitchNav;