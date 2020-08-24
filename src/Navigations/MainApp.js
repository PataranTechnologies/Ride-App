import React, { Component } from 'react';
import { createDrawerNavigator} from 'react-navigation-drawer'
import Home from '../components/Home'
 DrawerNav=createDrawerNavigator({

    Home:{screen:Home},
    

 },{
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
 })

 export default DrawerNav;