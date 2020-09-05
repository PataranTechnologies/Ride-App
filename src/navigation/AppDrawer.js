import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from '../components/DrawerContent';
import AppLoadingScreen from '../screens/app/AppLoadingScreen';
import BuyCreditScreen from '../screens/app/BuyCreditScreen';


const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home" headerMode='none'>
        <Stack.Screen name="Home" component={AppLoadingScreen} />
        <Stack.Screen name="BuyCredit" component={BuyCreditScreen} />
    </Stack.Navigator>
)

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <Drawer.Navigator initialRouteName="HomeStack" drawerContent={(props) => <DrawerContent {...props} />} >
            <Drawer.Screen name="HomeStack" component={HomeStack} />
        </Drawer.Navigator>
    );
}